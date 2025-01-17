import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { DEFALTE_PAGE_SIZE } from '../const/section.const';

export class QuerySectionDto {
  @ApiPropertyOptional({
    description: `
    - 다음에 받을 section 페이지
    - 넣지 않으면(쿼리스트링에 작성 안하면) 페이지네이션 시작단계임
    `,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly cursor?: number;

  @ApiPropertyOptional({
    description: `
    - 페이지 사이즈 값을 넣어서 몇 개의 section을 받을지 정함
    - 넣지 않으면(쿼리스트링에 작성 안하면) 디폴트로 ${DEFALTE_PAGE_SIZE}개를 가져옴
    `,
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pageSize?: number;
}
