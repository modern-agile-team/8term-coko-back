//controller : client로부터의 요청 처리. GET 요청 -> 서비스호출 -> 데이터반환

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { BuyItemDto } from './dto/buy-item.dto';
import { EquipItemDto } from './dto/equip-item.dto';

@Controller('items') // '/items'경로 요청 처리
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /items 요청 처리
  @Get()
  async getAllItems() {
    return await this.itemsService.getAllItems(); //service에서 아이템 목록을 받아서, 반환(return)
  }

  // POST /items/buy 요청 처리
  @Post('buy')
  async buyItem(@Body() buyItemDto: BuyItemDto) {
    const { userId, itemId } = buyItemDto;
    return await this.itemsService.buyItem(userId, itemId);
  }

  // GET /items/user/:userId 요청 처리
  @Get('users/:userId')
  async getUserItems(@Param('userId') userId: number) {
    return await this.itemsService.getUserItems(userId);
  }

  // POST /items/equip 요청 처리
  @Post('equip')
  async equipItem(@Body() equipItemDto: EquipItemDto) {
    const { userId, itemId } = equipItemDto;
    return await this.itemsService.equipItem(userId, itemId);
  }
}
