import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryProgressDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly sectionId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly partId?: number;
}
