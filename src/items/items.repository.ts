import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

interface WhereClause {
  mainCategoryId?: number;
  subCategoryId?: number;
}

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalItemCount(where: WhereClause): Promise<number> {
    return this.prisma.item.count({ where });
  }

  async findItems(
    page: number,
    limit: number,
    where: WhereClause,
  ): Promise<Item[]> {
    return this.prisma.item.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async existMainCategory(id: number): Promise<boolean> {
    const mainCategory = await this.prisma.itemMainCategory.findUnique({
      where: { id },
    });
    return !!mainCategory;
  }

  async existSubCategory(id: number): Promise<boolean> {
    const subCategory = await this.prisma.itemSubCategory.findUnique({
      where: { id },
    });
    return !!subCategory;
  }
}
