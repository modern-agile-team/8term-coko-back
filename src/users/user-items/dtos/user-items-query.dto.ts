import { IsOptional, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserItemsQueryDto {
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
}
