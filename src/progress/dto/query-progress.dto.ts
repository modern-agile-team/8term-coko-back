import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryProgressDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly sectionId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly partId?: number;
}
