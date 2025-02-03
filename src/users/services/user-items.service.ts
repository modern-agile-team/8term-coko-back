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

      //소유 여부 확인
      const existingItems = await prisma.userItem.findMany({
        where: {
          userId: userId,
          itemId: { in: itemIds },
        },
      });

      if (existingItems.length > 0) {
        const ownedItemIds = existingItems.map((item) => item.itemId);
        const duplicateItems = itemIds.filter((id) =>
          ownedItemIds.includes(id),
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

  async updateItemEquipStatus(equipItemDto: EquipItemDto): Promise<void> {
    const { userId, itemIds, isEquipped } = equipItemDto;

    const userItems = await this.prisma.userItem.findMany({
      //유저-아이템 조회
      where: {
        userId,
        itemId: { in: itemIds }, //userId와 itemIds가 일치하는 것을 찾기
      },
    });

    if (!userItems || userItems.length === 0) {
      throw new NotFoundException('User item not found');
    }

    //유저-아이템 착용상태 업데이트
    await this.prisma.userItem.updateMany({
      where: {
        userId,
        itemId: { in: itemIds },
      },
      data: { isEquipped },
    });
  }
}
