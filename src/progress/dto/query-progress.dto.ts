import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProgressDto {
  @IsOptional()
  @IsNumber()
  readonly sectionId?: number;

  @IsOptional()
  @IsString() // enum으로 변경되야함
  readonly part?: string;
}
