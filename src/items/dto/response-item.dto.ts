import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: '아이템 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '아이템 이름',
    example: 'blue-hat',
  })
  name: string;

  @ApiProperty({
    description: '아이템 이미지 URL',
    example: 'blue-hat.png',
  })
  image: string;

  @ApiProperty({
    description: '아이템 가격',
    example: 2000,
  })
  price: number;

  @ApiProperty({
    description: '메인 카테고리 ID',
    example: 1,
  })
  mainCategoryId: number;

  @ApiProperty({
    description: '서브 카테고리 ID',
    example: 2,
    required: false,
  })
  subCategoryId: number | null;
}
