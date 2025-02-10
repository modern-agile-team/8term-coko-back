import { Controller, Get, Param, Delete, HttpCode } from '@nestjs/common';
import { ItemsService } from './items.service';
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
