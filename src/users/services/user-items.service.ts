import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipUseritemDto } from '../dtos/equip-useritem.dto';
import { UserItemsPaginationQueryDto } from '../dtos/userItems-pagination-query.dto';
import { UserItemsRepository } from '../repositories/user-items.repository';
import { UserItemsPaginationResponseDto } from '../dtos/response-userItems-pagination.dto';
import { UserItem } from '../entities/user-item.entity';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class UserItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userItemsRepository: UserItemsRepository,
  ) {}

  //1. 사용자 아이템 목록 조회
  async getUserItemsByCategory(
    userId: number,
    query: UserItemsPaginationQueryDto,
  ): Promise<UserItemsPaginationResponseDto> {
    const { mainCategoryId, subCategoryId, page, limit } = query;
    //카테고리 존재 여부 확인
    if (
      mainCategoryId &&
      !(await this.userItemsRepository.existMainCategory(mainCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 메인 카테고리입니다: ${mainCategoryId}`,
      );
    }
    if (
      subCategoryId &&
      !(await this.userItemsRepository.existSubCategory(subCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 서브 카테고리입니다: ${subCategoryId}`,
      );
    }

    const where = {
      userId,
      ...(mainCategoryId && { mainCategoryId }),
      ...(subCategoryId && { subCategoryId }),
    };

    const totalCount = await this.userItemsRepository.getTotalItemCount(where);
    const userItems = await this.userItemsRepository.findUserItems(
      page,
      limit,
      where,
    );
    const contents = await Promise.all(
      userItems.map(async (userItem) => {
        const item = await this.prisma.item.findUnique({
          where: { id: userItem.itemId },
        });
        return { ...userItem, item };
      }),
    );

    return new UserItemsPaginationResponseDto({
      totalCount,
      currentPage: page,
      limit,
      contents,
    });
  }

  //2. 아이템 구매
  async buyUserItems(
    buyUserItemsDto: BuyUserItemsDto,
    userId: number,
    userPoint: number,
  ): Promise<void> {
    const { itemIds } = buyUserItemsDto;

    //아이템 존재 확인
    const items = await this.prisma.item.findMany({
      where: { id: { in: itemIds } },
      select: { id: true, price: true }, //필요한 부분(id, price)
    });

    //존재하지 않는 아이템 ID 찾기
    const foundItemIds = items.map((item) => item.id);
    const notFoundItems = itemIds.filter((id) => !foundItemIds.includes(id)); //요청한 id 중 존재하지 않는 아이템 ID 찾기

    if (notFoundItems.length > 0) {
      throw new NotFoundException(
        `다음 아이템을 찾을 수 없습니다. : ${notFoundItems.join(',')}`,
      );
    }
    //총 가격 계산
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    if (userPoint < totalPrice) {
      throw new BadRequestException('포인트가 부족합니다.');
    }

    await this.prisma.$transaction(async (prisma) => {
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
          `이미 보유한 아이템입니다.: ${duplicateItems.join(',')}`,
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

  //3. 아이템 장착/해제
  async updateItemEquipStatus(
    equipUseritemDto: EquipUseritemDto,
    userId: number,
  ): Promise<void> {
    const { itemIds, isEquipped } = equipUseritemDto;
    //트랜잭션 시작
    await this.prisma.$transaction(async (prisma) => {
      // 1. 장착하려는 아이템들 조회
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

      if (!userItems || userItems.length === 0) {
        throw new NotFoundException('아이템을 찾을 수 없습니다.');
      }

      if (isEquipped) {
        // 해제할 아이템 ID들을 저장할 Set
        const itemsToUnequip = new Set<number>();

        // 2. 장착 요청된 아이템들의 유효성 검사 및 해제할 아이템 찾기
        const mainCategoryItems = new Map<number, number[]>();
        const subCategoryItems = new Map<number, number[]>();

        for (const userItem of userItems) {
          const { mainCategory, subCategory } = userItem.item;

          if (!subCategory) {
            // 서브카테고리가 없는 경우
            if (!mainCategoryItems.has(mainCategory.id)) {
              mainCategoryItems.set(mainCategory.id, []);
            }
            mainCategoryItems.get(mainCategory.id)!.push(userItem.itemId);

            // 같은 메인 카테고리에서 여러 아이템 선택 검증
            if (mainCategoryItems.get(mainCategory.id)!.length > 1) {
              throw new BadRequestException(
                `메인 카테고리 "${mainCategory.name}"에서는 하나의 아이템만 선택 가능합니다.`,
              );
            }
          } else {
            // 서브카테고리가 있는 경우
            if (!subCategoryItems.has(subCategory.id)) {
              subCategoryItems.set(subCategory.id, []);
            }
            subCategoryItems.get(subCategory.id)!.push(userItem.itemId);

            // 같은 서브 카테고리에서 여러 아이템 선택 검증
            if (subCategoryItems.get(subCategory.id)!.length > 1) {
              throw new BadRequestException(
                `서브 카테고리 "${subCategory.name}"에서는 하나의 아이템만 선택 가능합니다.`,
              );
            }
          }
        }

        // 3. 현재 장착된 아이템들 조회
        const equippedItems = await prisma.userItem.findMany({
          where: {
            userId, // 해당 유저의
            isEquipped: true, // 현재 장착된 아이템 중
            NOT: {
              itemId: { in: itemIds }, // 현재 요청한 아이템들은 제외시킨다.
            },
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

        // 4. 해제할 아이템 결정
        for (const equipped of equippedItems) {
          const { mainCategory, subCategory } = equipped.item;
          if (!subCategory) {
            // 서브카테고리가 없는 경우
            if (mainCategoryItems.has(mainCategory.id)) {
              itemsToUnequip.add(equipped.itemId);
            }
          } else {
            // 서브카테고리가 있는 경우
            if (subCategoryItems.has(subCategory.id)) {
              itemsToUnequip.add(equipped.itemId);
            }
          }
        }

        // 5. 기존 아이템 해제
        if (itemsToUnequip.size > 0) {
          await prisma.userItem.updateMany({
            where: {
              userId,
              itemId: { in: Array.from(itemsToUnequip) },
            },
            data: { isEquipped: false },
          });
        }
      }

      // 6. 새 아이템 장착 또는 해제
      await prisma.userItem.updateMany({
        where: {
          userId,
          itemId: { in: itemIds },
        },
        data: { isEquipped }, // true: 장착, false: 해제
      });
    });
  }

  //4. 모든 장착된 아이템 해제
  async resetEquipment(userId: number): Promise<void> {
    // 사용자 존재 여부 확인
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 모든 장착된 아이템 해제
    await this.prisma.userItem.updateMany({
      where: { userId, isEquipped: true }, //장착된 아이템만 대상으로
      data: {
        isEquipped: false, //모두 장착 해제상태로 변경
      },
    });
  }
}
