import { Type } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class QueryProgressDto {
  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  readonly sectionId?: number;
}
