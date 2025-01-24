import {
  IsArray,
  IsInt,
  IsPositive,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyUserItemsDto {
  userId: number;

  @ApiProperty({
    description: '구매할 아이템 ID 배열',
    example: [1, 2, 3],
    minItems: 1,
    maxItems: 10,
  })
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  itemIds: number[];
}
