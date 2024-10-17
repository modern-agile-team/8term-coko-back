//controller : client로부터의 요청 처리. GET 요청 -> 서비스호출 -> 데이터반환

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { BuyItemDto } from './dto/buy-item.dto';

@Controller('items') // '/items'경로 요청 처리
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /items 요청 처리
  @Get()
  async getAllItems() {
    return await this.itemsService.getAllItems(); //service에서 아이템 목록을 받아서, 반환(return)
  }

  // Post /items/buy 요청 처리
  @Post('buy')
  async buyItem(@Body() buyItemDto: BuyItemDto) {
    const { userId, itemId } = buyItemDto;
    return await this.itemsService.buyItem(userId, itemId);
  }
}
