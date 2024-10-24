//service : 비즈니스 로직. 아이템 목록을 데이터베이스에서 가져오는 역할 -> 실제 데이터를 불러온다

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; //PrismaService를 통해 db에서 아이템목록 가져온다.

@Injectable() //클래스 : 의존성 주입 가능한 (다른 곳에서 이 클래스를 불러와서 사용할 수 있게 한다.)
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //모든 아이템 목록 조회 getAllItems
  async getAllItems() {
    return await this.prisma.items.findMany(); //prisma를 통해 db에서 모든 아이템(항목) 조회 : findMany()
  }

  //아이템 구매 buyItem
  async buyItem(userId: number, itemId: number): Promise<void> {
    //유저 아이템 유무 확인
    const existingItem = await this.prisma.userItems.findFirst({
      where: { userId, itemId },
    });

    if (existingItem) {
      throw new BadRequestException('User already owns this item.');
    }

    await this.prisma.userItems.create({
      data: {
        userId,
        itemId,
        quantity: 1,
      },
    });
  }

  //특정 사용자 아이템 목록 조회 getUserItems
  async getUserItems(userId: number) {
    const userItems = await this.prisma.userItems.findMany({
      where: { userId },
      include: {
        items: true, //연관 아이템 정보까지 조회 (없애야되나)
      },
    });
    if (!userItems || userItems.length === 0) {
      throw new NotFoundException('No items found for this user.');
    }
    return userItems.map((userItem) => ({
      id: userItem.items.id,
      name: userItem.items.name,
      cost: userItem.items.cost,
      image: userItem.items.image,
      quantity: userItem.quantity,
      isEquipped: userItem.isEquipped,
    }));
  }

  //아이템 장착
  async equipItem(userId: number, itemId: number): Promise<void> {
    const userItem = await this.prisma.userItems.findFirst({
      where: { userId, itemId },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }
    if (userItem.isEquipped) {
      throw new BadRequestException('Item is already equipped');
    }

    await this.prisma.userItems.update({
      where: { id: userItem.id },
      data: { isEquipped: true },
    });
  }

  //아이템 장착 해제
  async unequipItem(userId: number, itemId: number): Promise<void> {
    const userItem = await this.prisma.userItems.findFirst({
      where: { userId, itemId },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    if (!userItem.isEquipped) {
      throw new BadRequestException('Item is already unequipped');
    }

    await this.prisma.userItems.update({
      where: { id: userItem.id },
      data: { isEquipped: false },
    });
  }

  //특정 사용자의 특정 아이템 삭제
  async deleteUserItem(userId: number, itemId: number): Promise<void> {
    const userItem = await this.prisma.userItems.findFirst({
      where: { userId, itemId },
    });

    if (!userItem) {
      throw new NotFoundException('Item not found for this user');
    }

    await this.prisma.userItems.delete({
      where: { id: userItem.id },
    });
  }
}
