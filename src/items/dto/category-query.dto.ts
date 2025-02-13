import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryQueryDto {
  @IsNumber()
  @Type(() => Number)
  mainCategoryId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  subCategoryId?: number;
}
