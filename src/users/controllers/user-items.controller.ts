import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipUseritemDto } from '../dtos/equip-useritem.dto';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ParseIntPipe } from '@nestjs/common';
import { ApiGetUserItems } from '../swagger-dacorator/get-user-items.decorators';
import { ApiPostUserItems } from '../swagger-dacorator/post-user-items.decorators';
import { ApiPatchUserItems } from '../swagger-dacorator/patch-user-items.decorator';
import { ApiUnequipAllItems } from '../swagger-dacorator/put-user-items.decorators';

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
  @ApiPostUserItems()
  async buyUserItems(
    @Param('userId', PositiveIntPipe) userId: number,
    @Body() buyUserItemsDto: BuyUserItemsDto,
  ) {
    buyUserItemsDto.userId = userId;
    return await this.userItemsService.buyUserItems(buyUserItemsDto);
  }

  @Patch()
  @HttpCode(200)
  @ApiPatchUserItems()
  async updateItemEquipStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() equipUseritemDto: EquipUseritemDto,
  ): Promise<void> {
    equipUseritemDto.userId = userId;
    return await this.userItemsService.updateItemEquipStatus(equipUseritemDto);
  }

  @Put()
  @HttpCode(200)
  @ApiUnequipAllItems()
  async unequipAllItems(
    @Param('userId', PositiveIntPipe) userId: number,
  ): Promise<void> {
    return await this.userItemsService.unequipAllItems(userId);
  }
}
