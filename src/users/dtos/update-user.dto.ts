import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: Number,
    description: '유저 경험치',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  readonly experience?: number;

  @ApiProperty({
    type: Number,
    description: '유저 포인트',
    example: 300,
  })
  @IsOptional()
  @IsInt()
  readonly point?: number;
}
