import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipUseritemDto } from '../dtos/equip-useritem.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetUserItems } from '../swagger-dacorator/get-user-items.decorators';
import { ApiPostUserItems } from '../swagger-dacorator/post-user-items.decorators';
import { ApiPatchUserItems } from '../swagger-dacorator/patch-user-items.decorator';
import { ApiResetEquipment } from '../swagger-dacorator/put-user-items.decorators';
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
  @HttpCode(204)
  @ApiPostUserItems()
  @UseGuards(AuthGuard('accessToken'))
  async buyUserItems(
    @User() user: UserInfo,
    @Body() buyUserItemsDto: BuyUserItemsDto,
  ): Promise<void> {
    await this.userItemsService.buyUserItems(
      buyUserItemsDto,
      user.id,
      user.point,
    );
  }

  @Patch()
  @HttpCode(204)
  @ApiPatchUserItems()
  @UseGuards(AuthGuard('accessToken'))
  async updateItemEquipStatus(
    @User() user: UserInfo,
    @Body() equipUseritemDto: EquipUseritemDto,
  ): Promise<void> {
    await this.userItemsService.updateItemEquipStatus(
      equipUseritemDto,
      user.id,
    );
  }

  @Put('reset-equipment')
  @HttpCode(204)
  @ApiResetEquipment()
  @UseGuards(AuthGuard('accessToken'))
  async resetEquipment(@User() user: UserInfo): Promise<void> {
    await this.userItemsService.resetEquipment(user.id);
  }
}
