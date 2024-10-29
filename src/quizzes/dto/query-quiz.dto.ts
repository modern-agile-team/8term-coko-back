import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class QueryQuizDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sectionId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly partId?: number;
}
