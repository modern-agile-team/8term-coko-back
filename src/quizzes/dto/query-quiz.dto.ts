import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryQuizDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly sectionId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly partId?: number;
}
