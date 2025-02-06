import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  BuyItemDto,
  EquipItemDto,
  UnequipItemDto,
} from './dto/item-changeStatus.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiItems } from './items.swagger';

@ApiTags('items')
@Controller('items') // '/items'경로 요청 처리
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /items 요청 처리
  @Get()
  @ApiItems.getAllItems()
  async getAllItems() {
    return await this.itemsService.getAllItems(); //service에서 아이템 목록을 받아서, 반환(return)
  }

  // POST /items/buy 요청 처리
  @Post('buy')
  @HttpCode(204)
  @ApiItems.buyItem()
  async buyItem(@Body() buyItemDto: BuyItemDto): Promise<void> {
    await this.itemsService.buyItem(buyItemDto);
  }

  // GET /items/user/:userId 요청 처리
  @Get('users/:userId')
  @ApiItems.getUserItems()
  async getUserItems(@Param('userId') userId: number) {
    return await this.itemsService.getUserItems(userId);
  }

  // POST /items/equip 요청 처리
  @Post('equip')
  @HttpCode(204)
  @ApiItems.equipItem()
  async equipItem(@Body() equipItemDto: EquipItemDto) {
    await this.itemsService.equipItem(equipItemDto);
  }

  // POST /items/unequip 요청 처리
  @Post('unequip')
  @HttpCode(204)
  @ApiItems.unequipItem()
  async unequipItem(@Body() unequipItemDto: UnequipItemDto) {
    await this.itemsService.unequipItem(unequipItemDto);
  }

  // DELETE /items/:userId/:itemId 요청 처리
  @Delete('users/:userId/:itemId')
  @HttpCode(204)
  @ApiItems.deleteUserItem()
  async deleteUserItem(
    @Param('userId') userId: number,
    @Param('itemId') itemId: number,
  ) {
    await this.itemsService.deleteUserItem(userId, itemId);
  }
}
