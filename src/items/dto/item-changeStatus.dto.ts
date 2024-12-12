import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class ItemChangeStatusDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: '아이템 ID',
    example: 4,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  itemId: number;
}

export class BuyItemDto extends ItemChangeStatusDto {
  @ApiProperty({
    description: '아이템 ID 배열',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty() //비어있는 배열 안된다
  @IsInt({ each: true })
  @Min(1, { each: true })
  itemIds: number[];
}
