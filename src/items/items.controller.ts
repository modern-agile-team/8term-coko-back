import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiItems } from './items.swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //1. 새로운 아이템 추가 : POST /items
  @Post()
  @ApiItems.createItem()
  @HttpCode(201)
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  //2. 전체 아이템 목록 조회 : GET /items --> pagination 적용
  @Get()
  @ApiItems.getAllItems()
  @HttpCode(200)
  async getAllItems(@Query() paginationQuery: PaginationQueryDto) {
    return this.itemsService.getAllItems(paginationQuery);
  }

  //3. 단일 아이템 조회 : GET /items/:id
  @Get(':id')
  @ApiItems.getItemById()
  @HttpCode(200)
  async getItemById(@Param('id') id: number) {
    return this.itemsService.getItemById(id);
  }

  //4. 카테고리별 아이템 조회 : GET /items/category?mainCategoryId=1&subCategoryId=2
  @Get('category')
  @ApiItems.getItemsByCategory()
  @HttpCode(200)
  async getItemByCategory(
    @Query('mainCategoryId') mainCategoryId: number,
    @Query('subCategory') subCategoryId: number,
  ) {
    return this.itemsService.getItemByCategory(mainCategoryId, subCategoryId);
  }

  //5. 아이템 수정 : PATCH /items/:id
  @Patch(':id')
  @ApiItems.updateItem()
  @HttpCode(200)
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.updateItem(id, updateItemDto);
  }
}
