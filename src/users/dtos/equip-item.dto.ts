import { IsBoolean, IsInt, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EquipItemDto {
  userId: number;

  @ApiProperty({
    description: '장착/장착해제할 아이템 ID 배열',
    example: [1, 2],
    type: [Number],
    minimum: 1,
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  itemIds: number[];

  @ApiProperty({
    description: '장착 여부 (true: 장착, false: 장착해제)',
    example: true,
  })
  @IsBoolean()
  isEquipped: boolean;
}
