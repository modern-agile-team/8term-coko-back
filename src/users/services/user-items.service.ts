import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    if (userItems.length === 0) {
      throw new NotFoundException('User items not found');
    }
    return userItems;
  }
}
