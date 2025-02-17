import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDefaults } from 'src/common/constants/rankings-constants';

export class QueryChallengeDto {
  @ApiPropertyOptional({
    description: '페이지 크기',
    example: PaginationDefaults.PAGE_LIMIT,
    default: PaginationDefaults.PAGE_LIMIT,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly limit?: number = PaginationDefaults.PAGE_LIMIT;

  @ApiPropertyOptional({
    description: '페이지 번호 (1부터 시작)',
    example: PaginationDefaults.PAGE_NUMBER,
    default: PaginationDefaults.PAGE_NUMBER,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly page?: number = PaginationDefaults.PAGE_NUMBER;
}
