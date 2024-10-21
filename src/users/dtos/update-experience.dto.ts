import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateExperienceDto {
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
    description: '경험치 증가치',
    example: 30,
    default: 30,
  })
  @IsNumber()
  @Min(0)
  readonly experience: number;
}
