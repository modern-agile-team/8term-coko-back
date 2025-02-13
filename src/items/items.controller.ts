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
import { CategoryQueryDto } from './dto/category-query.dto';
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
  // @UseGuards(AuthGuard('adminAccessToken'))
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  //2. 전체 아이템 목록 조회 : GET /items -> pagination
  @Get()
  @ApiItems.getAllItems()
  @HttpCode(200)
  async getAllItems(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ): Promise<OffsetPaginationBaseResponseDto<Item>> {
    return this.itemsService.getAllItems({ page, limit });
  }

  //4. 카테고리별 아이템 조회 : GET /items/category?mainCategoryId=1&subCategoryId=2
  @Get('category')
  @ApiItems.getItemsByCategory()
  @HttpCode(200)
  async getItemsByCategory(@Query() query: CategoryQueryDto) {
    return this.itemsService.getItemsByCategory(
      query.mainCategoryId,
      query.subCategoryId,
    );
  }

  //3. 단일 아이템 조회 : GET /items/:id
  @Get(':id')
  @ApiItems.getItemById()
  @HttpCode(200)
  async getItemById(@Param('id', PositiveIntPipe) id: number) {
    return this.itemsService.getItemById(id);
  }

  //5. 아이템 수정 : PATCH /items/:id
  @Patch(':id')
  @ApiItems.updateItem()
  @HttpCode(200)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateItem(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.updateItem(id, updateItemDto);
  }
}
