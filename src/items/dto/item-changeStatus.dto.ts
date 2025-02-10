import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

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
