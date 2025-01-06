import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemChangeStatusDto, BuyItemDto } from './dto/change-item-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiItems } from './items.swagger';

@ApiTags('items')
@Controller('items') // '/items'경로 요청 처리
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /items 요청 처리
  @Get()
  @ApiItems.getAllItems()
  async getAllItems() {
    return await this.itemsService.getAllItems(); //service에서 아이템 목록을 받아서, 반환(return)
  }

  // Post /items/dev 요청 처리 (개발환경에서만 실행되도록 한다)
  @Post()
  @HttpCode(201)
  @ApiItems.addItem()
  async addItem(@Body() addItemDto: ItemChangeStatusDto): Promise<void> {
    await this.itemsService.addItem(addItemDto);
  }

  // POST /users/:userId/items/:itemId 요청 처리
  @Post('users/:userId/items/:itemId')
  @HttpCode(204)
  @ApiItems.buyItem()
  async buyItem(@Body() buyItemDto: BuyItemDto): Promise<void> {
    await this.itemsService.buyItem(buyItemDto);
  }

  // GET /users/:userId/items 요청 처리
  @Get('users/:userId')
  @ApiItems.getUserItems()
  async getUserItems(@Param('userId') userId: number) {
    return await this.itemsService.getUserItems(userId);
  }
}
