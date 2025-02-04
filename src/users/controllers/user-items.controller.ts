import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Body,
  HttpCode,
  UseGuards,
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
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user-items')
@Controller('users/me/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  //user의 아이템 목록 조회
  @Get()
  @HttpCode(200)
  @ApiGetUserItems()
  @UseGuards(AuthGuard('accessToken'))
  getUserItems(@User() user: UserInfo) {
    return this.userItemsService.getUserItems(user.id);
  }

  //user의 아이템 구매
  @Post()
  @HttpCode(201)
  @ApiPostUserItems()
  async buyUserItems(
    @User() user: UserInfo,
    @Body() buyUserItemsDto: BuyUserItemsDto,
  ) {
    buyUserItemsDto.userId = user.id;
    return await this.userItemsService.buyUserItems(buyUserItemsDto);
  }

  @Patch()
  @HttpCode(200)
  @ApiPatchUserItems()
  async updateItemEquipStatus(
    @Param('userId', PositiveIntPipe) userId: number,
    @Body() equipUseritemDto: EquipUseritemDto,
  ): Promise<void> {
    equipUseritemDto.userId = userId;
    return await this.userItemsService.updateItemEquipStatus(equipUseritemDto);
  }

  @Put('reset-equipment')
  @HttpCode(200)
  @ApiUnequipAllItems()
  async unequipAllItems(
    @Param('userId', PositiveIntPipe) userId: number,
  ): Promise<void> {
    return await this.userItemsService.unequipAllItems(userId);
  }
}
