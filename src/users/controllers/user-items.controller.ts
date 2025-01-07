import { Controller, Get } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-items')
@Controller('users/:id/items')
export class UserItemsController {
  constructor(private readonly itemsService: UserItemsService) {}
}
