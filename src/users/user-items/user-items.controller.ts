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
import { UserItemsService } from './user-items.service';
import { BuyUserItemsDto } from './dtos/buy-user-items.dto';
import { EquipUseritemDto } from './dtos/equip-user-item.dto';
import { UserItemsPaginationQueryDto } from './dtos/user-items-pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetUserItems } from './swagger-decorators/get-user-items.decorators';
import { ApiPostUserItems } from './swagger-decorators/post-user-items.decorators';
import { ApiPatchUserItems } from './swagger-decorators/patch-user-items.decorator';
import { ApiGetEquippedUserItems } from './swagger-decorators/get-equipped-user-items.decorators';
import { ApiResetEquipment } from './swagger-decorators/put-user-items.decorators';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserItemsQueryDto } from './dtos/user-items-query.dto';
import { ResponseUserEquippedDto } from './dtos/response-user-equipped.dto';
import { UserItemsPaginationResponseDto } from './dtos/response-user-items-pagination.dto';

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
  ): Promise<UserItemsPaginationResponseDto> {
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
  ): Promise<ResponseUserEquippedDto[]> {
    const response = await this.userItemsService.getEquippedUserItems(
      user.id,
      query,
    );
    return ResponseUserEquippedDto.fromArray(response);
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
