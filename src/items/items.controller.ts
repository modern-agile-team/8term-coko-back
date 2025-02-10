import { Controller, Get } from '@nestjs/common';
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
    return await this.itemsService.getAllItems();
  }
}
