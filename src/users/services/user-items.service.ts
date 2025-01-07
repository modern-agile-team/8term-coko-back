import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BuyItemDto } from '../dtos/buy-item.dto';

@Injectable()
export class UserItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserItems(userId: number) {
    const userItems = await this.prisma.userItem.findMany({
      where: { userId },
      include: {
        item: true,
      },
    });

    if (!userItems || userItems.length === 0) {
      throw new NotFoundException('User items not found');
    }
    return userItems;
  }

  async buyItem(buyItemDto: BuyItemDto): Promise<void> {
    const { userId, itemIds } = buyItemDto;

    await this.prisma.$transaction(async (prisma) => {
      //사용자 존재 여부 확인
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      //아이템 존재 확인
      const items = await prisma.item.findMany({
        where: { id: { in: itemIds } },
      });

      //아이템 수량 확인 (***이거 좀 이상한 코드 같기도..)
      if (items.length !== itemIds.length) {
        throw new NotFoundException('Some items not found');
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
      //이미 소유한 아이템이 있을 경우 (이것도 좀 이상한 것 같기도 하고,,,,)
      if (existingItems.length > 0) {
        const ownedItemIds = existingItems.map((item) => item.itemId);
        throw new BadRequestException(
          `User already owns the following items: ${ownedItemIds.join(',')}`,
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
}
