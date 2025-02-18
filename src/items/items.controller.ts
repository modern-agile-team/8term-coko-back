import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiItems } from './items.swagger';
import { itemsPaginationQueryDto } from './dto/items-pagination-query.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { Item } from '@prisma/client';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //1. 새로운 아이템 추가 : POST /items
  @Post()
  @ApiItems.createItem()
  @HttpCode(201)
  @UseGuards(AuthGuard('adminAccessToken'))
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  //2. 전체 아이템 목록 조회 : GET /items?mainCategoryId=1&subCategoryId=2&page=1&limit=8
  @Get()
  @ApiItems.getItemsByCategory()
  @HttpCode(200)
  async getItemsByCategory(
    @Query() query: itemsPaginationQueryDto,
  ): Promise<OffsetPaginationBaseResponseDto<Item>> {
    return this.itemsService.getItemsByCategory(query);
  }

  //3. 단일 아이템 조회 : GET /items/:itemId
  @Get(':itemId')
  @ApiItems.getItemById()
  @HttpCode(200)
  async getItemById(@Param('itemId', PositiveIntPipe) itemId: number) {
    return this.itemsService.getItemById(itemId);
  }

  //4. 아이템 수정 : PATCH /items/:itemId
  @Patch(':itemId')
  @ApiItems.updateItem()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateItem(
    @Param('itemId', PositiveIntPipe) itemId: number,
    @Body() body: UpdateItemDto,
  ) {
    await this.itemsService.updateItem(itemId, body);
  }
}
