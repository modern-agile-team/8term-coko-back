import { IsArray, IsInt, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyUserItemsDto {
  @ApiProperty({
    description: '구매할 아이템 ID 배열',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly itemIds: number[];
}
