import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //아이템 생성 createItem
  async createItem(createItemDto: CreateItemDto) {
    try {
      return await this.prisma.item.create({
        data: createItemDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        //P2002 : Prisma에러코드 : 유니크제약조건 위반 시 사용됨
        throw new BadRequestException(
          `이미 존재하는 아이템 이름입니다: ${createItemDto.name}`,
        );
      }
      throw error;
    }
  }
  //아이템 전체 조회 getAllItems
  async getAllItems(paginationQuery: PaginationQueryDto) {
    const { limit = 8, offset = 0 } = paginationQuery;
    return this.prisma.item.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getItemById(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('아이템을 찾을 수 없습니다.');
    }
    return item;
  }

  async getItemByCategory(mainCategoryId: number, subCategoryId?: number) {
    return this.prisma.item.findMany({
      where: {
        mainCategoryId,
        ...(subCategoryId && { subCategoryId }),
      },
    });
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
    if (!item) {
      throw new NotFoundException('아이템을 찾을 수 없습니다.');
    }
    return item;
  }
}
