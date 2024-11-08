import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryQuizDto {
  @ApiPropertyOptional({
    description: '자연수 section id 입력',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly sectionId?: number;

  @ApiPropertyOptional({
    description: '자연수 part id 입력',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly partId?: number;
}
