import { IsBoolean, IsInt, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EquipUseritemDto {
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
    description:
      '장착 여부 (true: 장착, false: 장착해제). true인 경우 같은 카테고리의 기존 아이템은 자동 해제됨',
    example: true,
  })
  @IsBoolean()
  isEquipped: boolean;
}
