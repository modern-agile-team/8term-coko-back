import { Difficulty } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class QueryQuizDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly sectionId?: number;

  @IsOptional()
  @IsEnum(Difficulty, { message: '잘못된 part value' })
  readonly difficulty?: Difficulty;
}
