import { ApiProperty } from '@nestjs/swagger';

export class ResponseItemDto {
  @ApiProperty({
    description: '아이템 ID',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    description: '아이템 이름',
    example: '검정 모자',
  }) //UserItem id
  readonly name: string;

  @ApiProperty({
    description: '아이템 가격',
    example: 2000,
  })
  readonly price: number;

  @ApiProperty({
    description: '아이템 이미지 URL',
    example: 'https://example.com/blackhatImage.jpg',
  })
  readonly image: string;

  @ApiProperty({
    description: '메인 카테고리 ID',
    example: 2,
  })
  readonly mainCategoryId: number;

  @ApiProperty({
    description: '서브 카테고리 ID',
    example: 1,
    nullable: true,
  })
  readonly subCategoryId: number | null;

  @ApiProperty({
    description: '아이템 착용 여부',
    example: false,
  })
  readonly isEquipped: boolean;

  @ApiProperty({
    description: '아이템 구매 일시',
    example: '2025-01-23T12:00:00Z',
  })
  readonly purchasedAt: Date;

  constructor(item: any, userItem?: any) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
    this.mainCategoryId = item.mainCategoryId;
    this.subCategoryId = item.subCategoryId;
    this.isEquipped = userItem?.isEquipped ?? false;
    this.purchasedAt = userItem?.purchasedAt ?? new Date();
  }
}
