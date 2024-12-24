import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdatePartOrderDto {
  @ApiProperty({
    description: '섹션 순서',
    example: 1,
  })
  @IsInt()
  @Min(0)
  readonly order: number;
}
