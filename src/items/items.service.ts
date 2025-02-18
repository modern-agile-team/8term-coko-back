import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { BadRequestException } from '@nestjs/common';
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
    const { name, mainCategoryId, subCategoryId } = createItemDto;

    const item = await this.prisma.item.findUnique({
      where: { name },
    });
    if (item) {
      throw new BadRequestException(`이미 존재하는 아이템 이름입니다: ${name}`);
    }

    const mainCategory = await this.prisma.itemMainCategory.findUnique({
      where: { id: mainCategoryId },
    });
    if (!mainCategory) {
      throw new BadRequestException(
        `존재하지 않는 메인 카테고리입니다: ${mainCategoryId}`,
      );
    }

    const subCategory = await this.prisma.itemSubCategory.findUnique({
      where: { id: subCategoryId },
    });
    if (!subCategory) {
      throw new BadRequestException(
        `존재하지 않는 서브 카테고리입니다: ${subCategoryId}`,
      );
    }

    return this.prisma.item.create({
      data: createItemDto,
    });
  }
  //아이템 전체 조회 getAllItems
  async getItemsByCategory(
    query: itemsPaginationQueryDto,
  ): Promise<ItemsPaginationResponseDto> {
    const { mainCategoryId, subCategoryId, page, limit } = query;

    if (
      mainCategoryId &&
      !(await this.itemsRepository.existMainCategory(mainCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 메인 카테고리입니다: ${mainCategoryId}`,
      );
    }

    if (
      subCategoryId &&
      !(await this.itemsRepository.existSubCategory(subCategoryId))
    ) {
      throw new NotFoundException(
        `존재하지 않는 서브 카테고리입니다: ${subCategoryId}`,
      );
    }

    const where = {
      ...(mainCategoryId && { mainCategoryId }),
      ...(subCategoryId && { subCategoryId }),
    };

    const totalCount = await this.itemsRepository.getTotalItemCount(where);
    const contents = await this.itemsRepository.findItems(page, limit, where);

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

  async updateItem(id: number, body: UpdateItemDto) {
    const { name, mainCategoryId, subCategoryId } = body;

    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('아이템을 찾을 수 없습니다.');
    }

    if (name) {
      const existingItemWithName = await this.prisma.item.findUnique({
        where: { name },
      });
      if (existingItemWithName) {
        throw new BadRequestException('이미 존재하는 아이템 이름입니다.');
      }
    }

    if (mainCategoryId) {
      const existingMainCategory =
        await this.prisma.itemMainCategory.findUnique({
          where: { id: mainCategoryId },
        });
      if (!existingMainCategory) {
        throw new BadRequestException('존재하지 않는 메인 카테고리입니다.');
      }
    }

    if (subCategoryId) {
      const existingSubCategory = await this.prisma.itemSubCategory.findUnique({
        where: { id: subCategoryId },
      });
      if (!existingSubCategory) {
        throw new BadRequestException('존재하지 않는 서브 카테고리입니다.');
      }
    }

    return this.prisma.item.update({
      where: { id },
      data: body,
    });
  }
}
