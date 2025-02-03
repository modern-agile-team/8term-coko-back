import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipItemDto } from '../dtos/equip-item.dto';
import { ResponseItemDto } from '../dtos/response-item.dto';

@Injectable()
export class UserItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //사용자 아이템 목록 조회
  async getUserItems(userId: number): Promise<ResponseItemDto[]> {
    try {
      //1. user_items의 유저의 itemId조회
      const userItems = await this.prisma.userItem.findMany({
        where: { userId },
        include: {
          item: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true,
              mainCategoryId: true,
              subCategoryId: true,
            },
          },
        },
      });

      if (!userItems.length) {
        throw new NotFoundException('User items not found');
      }

      //3. ResponseItemDto 형식으로 변환
      return userItems.map(
        (userItem) => new ResponseItemDto(userItem.item, userItem),
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('아이템 조회 중 오류 발생');
    } //500에러
  }

  //아이템 구매
  async buyUserItems(buyUserItemsDto: BuyUserItemsDto): Promise<void> {
    const { userId, itemIds } = buyUserItemsDto;

    await this.prisma.$transaction(async (prisma) => {
      //사용자 존재 여부 확인
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      //아이템 존재 확인
      const items = await prisma.item.findMany({
        where: { id: { in: itemIds } },
        select: { id: true, price: true }, //필요한 부분(id, price)
      });

      //존재하지 않는 아이템 ID 찾기
      const foundItemIds = items.map((item) => item.id);
      const notFoundItems = itemIds.filter((id) => !foundItemIds.includes(id)); //요청한 id 중 존재하지 않는 아이템 ID 찾기

      if (notFoundItems.length > 0) {
        throw new NotFoundException(
          `Items not found: ${notFoundItems.join(',')}`,
        );
      }
      //총 가격 계산
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

      if (user.point < totalPrice) {
        throw new BadRequestException('Insufficient points to buy these items');
      }

      //소유 여부 확인 (중복 아이템 구매 방지)
      const existingItems = await prisma.userItem.findMany({
        where: {
          userId: userId,
          itemId: { in: itemIds },
        },
      });

      if (existingItems.length > 0) {
        const ownedItemIds = existingItems.map((item) => item.itemId); //이미 가진 아이템 id
        const duplicateItems = itemIds.filter(
          (
            id, // 중복 아이템 id
          ) => ownedItemIds.includes(id),
        );
        throw new BadRequestException(
          `User already owns the following items: ${duplicateItems.join(',')}`,
        );
      }

      //포인트 차감
      await prisma.user.update({
        where: { id: userId },
        data: { point: { decrement: totalPrice } },
      });

      //유저-아이템 관계 생성
      const userItemsData = itemIds.map((itemId) => ({
        userId,
        itemId,
      }));

      await prisma.userItem.createMany({
        data: userItemsData,
      });
    });
  }

  //아이템 착용상태 업데이트
  async updateItemEquipStatus(equipItemDto: EquipItemDto): Promise<void> {
    const { userId, itemIds, isEquipped } = equipItemDto;
    await this.prisma.$transaction(async (prisma) => {
      console.log('Request:', { userId, itemIds, isEquipped });

      // 사용자 아이템 존재 여부 확인 (아이템 카테고리 정보도 함께 조회)
      const userItems = await prisma.userItem.findMany({
        where: {
          userId,
          itemId: { in: itemIds },
        },
        include: {
          item: {
            include: {
              mainCategory: true,
              subCategory: true,
            },
          },
        },
      });

      console.log('Found userItems:', JSON.stringify(userItems, null, 2));

      if (!userItems || userItems.length === 0) {
        throw new NotFoundException('User item not found');
      }

      if (isEquipped) {
        // 메인 카테고리별로 아이템 그룹화
        const itemsByMainCategory = new Map();

        for (const userItem of userItems) {
          const { mainCategory, subCategory } = userItem.item;

          if (!itemsByMainCategory.has(mainCategory.id)) {
            itemsByMainCategory.set(mainCategory.id, {
              mainCategory,
              items: [],
            });
          }

          itemsByMainCategory
            .get(mainCategory.id)
            .items.push({ ...userItem, subCategory });
        }
        for (const [_, categoryGroup] of itemsByMainCategory) {
          const { mainCategory, items } = categoryGroup;

          // 현재 장착된 아이템들 조회
          const equippedItems = await prisma.userItem.findMany({
            where: {
              userId,
              isEquipped: true,
              item: {
                // 같은 메인 카테고리
                mainCategoryId: mainCategory.id,
              },
            },
            include: {
              item: {
                include: {
                  subCategory: true,
                },
              },
            },
          });

          console.log(
            'Equipped items:',
            JSON.stringify(equippedItems, null, 2),
          );

          if (items.some((item) => !item.subCategory)) {
            //서브카테고리가 없는 경우 : 카테고리당 하나만 장착 가능
            if (equippedItems.length > 0) {
              throw new BadRequestException(
                `Can only equip one item from main category: ${mainCategory.name}`,
              );
            }
            continue;
          }
          //서브카테고리별로 그룹화하여 검증
          const itemsBySubCategory = new Map();
          items.forEach((item) => {
            if (!itemsBySubCategory.has(item.subCategory.id)) {
              itemsBySubCategory.set(item.subCategory.id, []);
            }
            itemsBySubCategory.get(item.subCategory.id).push(item);
          });

          // 각 서브카테고리별로 중복 장착 검사
          for (const [subCategoryId, subCategoryItems] of itemsBySubCategory) {
            const existingEquipped = equippedItems.filter(
              (eq) => eq.item.subCategory?.id === subCategoryId,
            );

            if (
              existingEquipped.length > 0 &&
              !existingEquipped.every((eq) => itemIds.includes(eq.itemId))
            ) {
              const subCategoryName = subCategoryItems[0].subCategory.name;
              throw new BadRequestException(
                `Can only equip one item from sub category: ${subCategoryName}`,
              );
            }
          }
        }
      }

      await prisma.userItem.updateMany({
        where: {
          userId,
          itemId: { in: itemIds },
        },
        data: { isEquipped },
      });
    });
  }
}
