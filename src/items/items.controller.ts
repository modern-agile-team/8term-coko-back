import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiItems } from './items.swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //1. 새로운 아이템 추가 : POST /items
  @Post()
  @ApiItems.createItem()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  //2. 전체 아이템 목록 조회 : GET /items
  @Get()
  @ApiItems.getAllItems()
  async getAllItems() {
    return this.itemsService.getAllItems();
  }

  //3. 단일 아이템 조회 : GET /items/:id
  @Get(':id')
  @ApiItems.getItemById()
  async getItemById(@Param('id') id: number) {
    return this.itemsService.getItemById(id);
  }

  //4. 카테고리별 아이템 조회 : GET /items/category?mainCategoryId=1&subCategoryId=2
  @Get('category')
  @ApiItems.getItemsByCategory()
  async getItemByCategory(
    @Query('mainCategoryId') mainCategoryId: number,
    @Query('subCategory') subCategoryId: number,
  ) {
    return this.itemsService.getItemByCategory(mainCategoryId, subCategoryId);
  }

  //5. 아이템 수정 : PATCH /items/:id
  @Patch(':id')
  @ApiItems.updateItem()
  async updateItem(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.updateItem(id, updateItemDto);
  }
}
