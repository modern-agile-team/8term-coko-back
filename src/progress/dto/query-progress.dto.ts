import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProgressDto {
  @IsOptional()
  @IsString() //넘버로 바꾸는 데코레이터 추가해야함
  readonly sectionId?: string; // 이거 넘버로 바뀌게 바꿔야함

  @IsOptional()
  @IsString()
  readonly part?: string;
}
