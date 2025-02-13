import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalItemCount(): Promise<number> {
    return this.prisma.item.count();
  }

  async findItems(page: number, limit: number): Promise<Item[]> {
    return this.prisma.item.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
