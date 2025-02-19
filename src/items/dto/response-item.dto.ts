import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({
    description: '아이템 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '아이템 이름',
    example: 'coko-setup',
  })
  name: string;

  @ApiProperty({
    description: '아이템 이미지 URL',
    example: 'coko-setup.png',
  })
  image: string;

  @ApiProperty({
    description: '아이템 가격',
    example: 10000,
  })
  price: number;

  @ApiProperty({
    description: '메인 카테고리 ID',
    example: 1,
  })
  mainCategoryId: number;

  @ApiProperty({
    description: '서브 카테고리 ID',
    example: 1,
    required: false,
  })
  subCategoryId: number | null;
}

export class PaginatedItemsResponseDto {
  @ApiProperty({ description: '전체 아이템 수', example: 11 })
  totalCount: number;

  @ApiProperty({ description: '전체 페이지 수', example: 2 })
  totalPages: number;

  @ApiProperty({ description: '현재 페이지', example: 1 })
  currentPage: number;

  @ApiProperty({ description: '아이템 목록', type: [ItemDto] })
  contents: ItemDto[];
}
