import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: Number,
    description: '유저 경험치',
    example: 200,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly experience?: number;

  @ApiProperty({
    type: Number,
    description: '유저 포인트',
    example: 300,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly point?: number;
}
