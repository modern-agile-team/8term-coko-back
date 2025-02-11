import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number; // limit : 한 번에 가져올 데이터의 최대 개수

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number; // offset : 데이터를 가져올 시작 지점 (ex. limit = 10, offset = 0 -> 1-10번째 데이터를 1페이지에 가져온다)
}
