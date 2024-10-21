//controller : client로부터의 요청 처리. GET 요청 -> 서비스호출 -> 데이터반환

import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { BuyItemDto } from './dto/buy-item.dto';
import { EquipItemDto } from './dto/equip-item.dto';
import { UnequipItemDto } from './dto/unequip-item.dto';

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

  // POST /items/unequip 요청 처리
  @Post('unequip')
  async unequipItem(@Body() unequipItemDto: UnequipItemDto) {
    const { userId, itemId } = unequipItemDto;
    return await this.itemsService.unequipItem(userId, itemId);
  }

  // DELETE /items/:userId/:itemId 요청 처리
  @Delete('users/:userId/:itemId')
  async deleteUserItem(
    @Param('userId') userId: number,
    @Param('itemId') itemId: number,
  ) {
    return await this.itemsService.deleteUserItem(userId, itemId);
  }
}
