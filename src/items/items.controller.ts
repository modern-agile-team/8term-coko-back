import { Controller, Get, Param, HttpCode, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiItems } from './items.swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // GET /items : 전체 아이템 조회 + 필터링 추가(maincategory, subcategory : 카테고리의 아이템 조회)
  //**프론트-> 어떻게 보내는 게 맞을지 대화 필요 *//
  @Get()
  @ApiItems.getItems()
  async getItems(
    @Query('maincategory') mainCategoryId?: number,
    @Query('subcategory') subCategoryId?: number,
  ) {
    return await this.itemsService.getItems(mainCategoryId, subCategoryId);
  }
}
