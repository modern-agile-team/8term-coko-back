import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateExperienceDto {
  @ApiProperty({
    required: true,
    type: Number,
    description: '경험치 증가치',
    example: 30,
  })
  @IsNumber()
  @Min(0)
  readonly experience: number;
}
