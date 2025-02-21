import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserItem } from '../entities/user-item.entity';

interface WhereClause {
  userId?: number;
  mainCategoryId?: number;
  subCategoryId?: number;
}

@Injectable()
export class UserItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  //아이템 목록 조회
  async findUserItems(
    page: number,
    limit: number,
    where: WhereClause,
  ): Promise<UserItem[]> {
    return this.prisma.userItem.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  //메인 카테고리 존재 여부 확인
  async existMainCategory(id: number): Promise<boolean> {
    const mainCategory = await this.prisma.itemMainCategory.findUnique({
      where: { id },
    });
    return !!mainCategory;
  }

  //서브 카테고리 존재 여부 확인
  async existSubCategory(id: number): Promise<boolean> {
    const subCategory = await this.prisma.itemSubCategory.findUnique({
      where: { id },
    });
    return !!subCategory;
  }

  //아이템 총 개수 조회
  async getTotalItemCount(where: any): Promise<number> {
    return this.prisma.userItem.count({ where });
  }
}
