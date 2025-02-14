import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class itemsPaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  mainCategoryId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  subCategoryId?: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1; //기본값 1

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 8; //기본값 8
}

// 메인카테고리ID와 서브카테고리ID는 선택적으로 포함될 수 있다.
// page와 limit는 필수 값이다.
