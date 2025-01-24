import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipItemDto } from '../dtos/equip-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ParseIntPipe } from '@nestjs/common';
import { ApiGetUserItems } from '../swagger-dacorator/get-user-items.decorators';

@ApiTags('user-items')
@Controller('users/:userId/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  //user의 아이템 목록 조회
  @Get()
  @HttpCode(200)
  @ApiGetUserItems()
  getUserItems(@Param('userId', PositiveIntPipe) userId: number) {
    return this.userItemsService.getUserItems(userId);
  }

  //user의 아이템 구매
  @Post()
  @HttpCode(201)
  async buyUserItems(
    @Param('userId', PositiveIntPipe) userId: number,
    @Body() buyUserItemsDto: BuyUserItemsDto,
  ) {
    buyUserItemsDto.userId = userId;
    return await this.userItemsService.buyUserItems(buyUserItemsDto);
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
