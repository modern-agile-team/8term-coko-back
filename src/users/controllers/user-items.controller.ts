import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { ApiTags } from '@nestjs/swagger';
import { BuyItemDto } from '../dtos/buy-item.dto';
import { EquipItemDto } from '../dtos/equip-item.dto';

@ApiTags('user-items')
@Controller('users/:userId/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  @Get()
  async getUserItems(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userItemsService.getUserItems(userId);
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
