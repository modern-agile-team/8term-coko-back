import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-items')
@Controller('users/:id/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  @Get()
  async getUserItems(@Param('id', ParseIntPipe) userId: number) {
    return await this.userItemsService.getUserItems(userId);
  }
}
