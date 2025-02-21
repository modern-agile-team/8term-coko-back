import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserItemsPaginationQueryDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '메인 카테고리 ID',
    example: 1,
  })
  @Type(() => Number)
  mainCategoryId?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '서브 카테고리 ID',
    example: 2,
  })
  @Type(() => Number)
  subCategoryId?: number;

  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '페이지 번호 (기본값: 1)',
    example: 1,
  })
  @Type(() => Number)
  page: number = 1; //기본값 1

  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '페이지당 아이템 수 (기본값: 8)',
    example: 8,
  })
  @Type(() => Number)
  limit: number = 8; //기본값 8
}
