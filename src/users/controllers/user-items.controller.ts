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
import { ApiGetUserItems } from '../swagger-decorator/get-user-items.decorators';
import { ApiPostUserItems } from '../swagger-decorator/post-user-items.decorators';
import { ApiPatchUserItems } from '../swagger-decorator/patch-user-items.decorator';
import { ApiGetEquippedUserItems } from '../swagger-decorator/get-equipped-user-items.decorators';
import { ApiResetEquipment } from '../swagger-decorator/put-user-items.decorators';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from 'src/users/entities/user-item.entity';
import { UserItemsQueryDto } from '../dtos/userItems-query.dto';

@ApiTags('user-items')
@Controller('users/me/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  //1. 전체 아이템 목록 조회 : GET /users/me/items?mainCategoryId=1&subCategoryId=2&page=1&limit=8
  @Get()
  @ApiGetUserItems()
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async getUserItemsByCategory(
    @User() user: UserInfo,
    @Query() query: UserItemsPaginationQueryDto,
  ): Promise<OffsetPaginationBaseResponseDto<UserItem>> {
    return this.userItemsService.getUserItemsByCategory(user.id, query);
  }

  //2. user의 아이템 구매
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

  //3. 아이템 장착/해제
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

  //4. 장착된 아이템 조회
  @Get('equipped')
  @ApiGetEquippedUserItems()
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async getEquippedUserItems(
    @User() user: UserInfo,
    @Query() query: UserItemsQueryDto,
  ): Promise<UserItem[]> {
    return this.userItemsService.getEquippedUserItems(user.id, query);
  }

  //5. 장착 아이템 초기화
  @Put('reset-equipment')
  @HttpCode(204)
  @ApiResetEquipment()
  @UseGuards(AuthGuard('accessToken'))
  async resetEquipment(@User() user: UserInfo): Promise<void> {
    await this.userItemsService.resetEquipment(user.id);
  }
}
