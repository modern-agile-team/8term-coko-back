import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
