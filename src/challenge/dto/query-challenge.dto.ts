import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDefaults } from 'src/common/constants/rankings-constants';

export class QueryChallengeDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = PaginationDefaults.PAGE_LIMIT;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number = PaginationDefaults.PAGE_LIMIT;
}
