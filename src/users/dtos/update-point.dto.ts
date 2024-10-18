import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePointDto {
  @ApiProperty({
    type: String,
    description: '유저 닉네임',
    example: 'gwgw123',
    default: 'nickname',
    minimum: 2,
    maximum: 10,
  })
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '포인트 증감치',
    example: 30,
    default: 30,
  })
  @IsNumber()
  readonly point: number;
}
