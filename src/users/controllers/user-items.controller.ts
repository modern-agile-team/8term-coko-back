import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { BuyItemDto } from '../dtos/buy-item.dto';
import { EquipItemDto } from '../dtos/equip-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ParseIntPipe } from '@nestjs/common';

@ApiTags('items')
@Controller('users/:userId/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  //user의 아이템 목록 조회
  @Get()
  getUserItems(@Param('userId', PositiveIntPipe) userId: number) {
    return this.userItemsService.getUserItems(userId);
  }

  @Post(':itemId')
  async buyItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() buyItemDto: BuyItemDto,
  ) {
    buyItemDto.userId = userId;
    return await this.userItemsService.buyItem(buyItemDto);
  }

  @Patch()
  async updateItemEquipStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() equipItemDto: EquipItemDto,
  ) {
    equipItemDto.userId = userId;
    return await this.userItemsService.updateItemEquipStatus(equipItemDto);
  }
}
