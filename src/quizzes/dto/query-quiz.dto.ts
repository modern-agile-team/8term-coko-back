import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class QueryQuizDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly sectionId?: number;

  @IsOptional()
  @IsNumber()
  readonly difficulty?: Difficulty;
}
