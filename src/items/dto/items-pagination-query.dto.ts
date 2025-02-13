import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class itemsPaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number; // limit : 한 번에 가져올 데이터의 최대 개수

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page?: number; //
}
