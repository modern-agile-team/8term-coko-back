import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { ApiTags } from '@nestjs/swagger';

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
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return await this.userItemsService.buyItem(userId, itemId);
  }
}
