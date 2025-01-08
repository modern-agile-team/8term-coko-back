import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QuerySectionDto {
  @ApiPropertyOptional({
    description: '커서가 가리킬 section id ?',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly cursor: number;

  @ApiPropertyOptional({
    description: '가져 올 섹션 개수',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pageSize: number;
}
