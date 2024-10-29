import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePointDto {
  @ApiProperty({
    type: String,
    description: '유저 닉네임',
    example: 'gwgw123',
    minimum: 2,
    maximum: 10,
  })
  @IsOptional()
  @IsString()
  @Length(2, 10)
  readonly nickname?: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: '포인트 증감치',
    example: 30,
  })
  @IsInt()
  readonly point: number;
}
