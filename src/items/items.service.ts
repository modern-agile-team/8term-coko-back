import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.
import { BuyItemDto, ItemChangeStatusDto } from './dto/item-changeStatus.dto';

@Injectable() //클래스 : 의존성 주입 가능 (다른 곳에서 이 클래스를 불러와서 사용할 수 있게 한다)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //모든 아이템 목록 조회 getAllItems
  getAllItems() {
    return this.prisma.item.findMany(); // findMany() : 모든 아이템(항목) 조회
  }

  //아이템 구매 buyItem
  async buyItem(buyItemDto: BuyItemDto): Promise<void> {
    const { userId, itemId } = buyItemDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new BadRequestException('Item not found');
    }

    //유저 아이템 유무 확인
    const existingItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (existingItem) {
      throw new BadRequestException('User already owns this item.');
    }

    await this.prisma.userItem.create({
      data: {
        userId,
        itemId,
      },
    });
  }

  //특정 사용자 아이템 목록 조회 getUserItems
  getUserItems(userId: number) {
    return this.prisma.userItem.findMany({
      where: { userId },
    });
  }

  //아이템 장착
  async equipItem(equipItemDto: ItemChangeStatusDto): Promise<void> {
    const { userId, itemId } = equipItemDto;
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }
    if (userItem.isEquipped) {
      throw new BadRequestException('Item is already equipped');
    }

    await this.prisma.userItem.update({
      where: { id: userItem.id },
      data: { isEquipped: true },
    });
  }

  //아이템 장착 해제
  async unequipItem(unequipItemDto: ItemChangeStatusDto): Promise<void> {
    const { userId, itemId } = unequipItemDto;
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: { userId, itemId },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    if (!userItem.isEquipped) {
      throw new BadRequestException('Item is already unequipped');
    }

    await this.prisma.userItem.update({
      where: { id: userItem.id },
      data: { isEquipped: false },
    });
  }

  //특정 사용자의 특정 아이템 삭제
  async deleteUserItem(userId: number, itemId: number): Promise<void> {
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    await this.prisma.userItem.delete({
      where: { id: userItem.id },
    });
  }
}
