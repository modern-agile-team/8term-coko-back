import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QuerySectionDto {
  @ApiPropertyOptional({ description: '커서가 가리킬 order 값', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly cursor?: number;

  @ApiPropertyOptional({ description: '가져올 데이터 수', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pageSize?: number;
}
