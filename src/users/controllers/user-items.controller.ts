import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Body,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';
import { EquipUseritemDto } from '../dtos/equip-useritem.dto';
import { UserItemsPaginationQueryDto } from '../dtos/userItems-pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetUserItems } from '../swagger-dacorator/get-user-items.decorators';
import { ApiPostUserItems } from '../swagger-dacorator/post-user-items.decorators';
import { ApiPatchUserItems } from '../swagger-dacorator/patch-user-items.decorator';
import { ApiResetEquipment } from '../swagger-dacorator/put-user-items.decorators';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from '@prisma/client';

@ApiTags('user-items')
@Controller('users/me/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  //user의 아이템 목록 조회 -> pagination 적용
  //1. 전체 아이템 목록 조회 : GET /users/me/items?mainCategoryId=1&subCategoryId=2&page=1&limit=8
  @Get()
  @ApiGetUserItems()
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async getUserItems(
    @User() user: UserInfo,
    @Query() query: UserItemsPaginationQueryDto,
  ): Promise<OffsetPaginationBaseResponseDto<UserItem>> {
    return this.userItemsService.getUserItems(user.id, query);
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
