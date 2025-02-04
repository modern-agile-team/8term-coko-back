import { IsBoolean, IsInt, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EquipUseritemDto {
  @ApiProperty({
    description: '장착/장착해제할 아이템 ID 배열',
    example: [1, 2],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  readonly itemIds: number[];

  @ApiProperty({
    description:
      '장착 여부 (true: 장착, false: 장착해제). true인 경우 같은 카테고리의 기존 아이템은 자동 해제됨',
    example: true,
  })
  @IsBoolean()
  readonly isEquipped: boolean;
}
