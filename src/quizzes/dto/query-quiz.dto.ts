import { Part } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class QueryQuizDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly sectionId?: number;

  @IsOptional()
  @IsEnum(Part, { message: '잘못된 part value' })
  readonly part?: Part;
}
