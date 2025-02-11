import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  //아이템 생성 createItem
  async createItem(createItemDto: CreateItemDto) {
    console.log('what is createItemDto', createItemDto);
    //카테고리 검증 (mainCategory, subCategory유효성 검사)
    const mainCategory = await this.prisma.itemMainCategory.findUnique({
      where: { id: createItemDto.mainCategoryId },
    });
    if (!mainCategory) {
      throw new BadRequestException('존재하지 않는 메인 카테고리입니다.');
    }
    if (createItemDto.subCategoryId) {
      const subCategory = await this.prisma.itemSubCategory.findUnique({
        where: { id: createItemDto.subCategoryId },
      });
      if (!subCategory) {
        throw new BadRequestException('존재하지 않는 서브 카테고리입니다.');
      }
    }
    //아이템 생성
    try {
      return await this.prisma.item.create({
        data: createItemDto,
      });
    } catch (error) {
      console.error('Error creating item', error);
      throw new BadRequestException('아이템 생성 중 오류가 발생했습니다.');
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
