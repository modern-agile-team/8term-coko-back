import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Item } from '@prisma/client';
import { ItemsRepository } from './items.repository';
import { ItemsPaginationResponseDto } from './dto/items-pagination-response.dto';
import { itemsPaginationQueryDto } from './dto/items-pagination-query.dto';
@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly itemsRepository: ItemsRepository,
  ) {}

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
      console.error('Database Error:', error); //서버 로그에 오류 기록
      throw new InternalServerErrorException('서버 오류 발생'); //클라이언트에는 일반화된 오류 메시지 반환
    }
  }
  //아이템 전체 조회 getAllItems
  async getAllItems(
    itemsPaginationQuery: itemsPaginationQueryDto,
  ): Promise<ItemsPaginationResponseDto> {
    const { limit = 8, page = 1 } = itemsPaginationQuery;

    const totalCount = await this.itemsRepository.getTotalItemCount();
    const contents = await this.itemsRepository.findItems(page, limit);

    return new ItemsPaginationResponseDto({
      totalCount,
      currentPage: page,
      limit,
      contents,
    });
  }

  async getItemById(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id: id } });
    if (!item) {
      throw new NotFoundException(`아이템을 찾을 수 없습니다. ID: ${id}`);
    }
    return item;
  }

  async getItemsByCategory(mainCategoryId: number, subCategoryId?: number) {
    const where = {
      mainCategoryId,
      ...(subCategoryId && { subCategoryId }),
    };

    return await this.prisma.item.findMany({ where });
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
