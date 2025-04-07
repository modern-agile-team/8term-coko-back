import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateSectionOrderDto {
  @ApiProperty({
    description: '섹션 순서',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly order: number;
}
