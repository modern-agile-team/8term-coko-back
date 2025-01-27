import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Sort, SortValues } from '../entities/ranking.entity';
import { PaginationDefaults } from 'src/common/constants/rankings-constants';

export class RankingQueryDto {
  @ApiPropertyOptional({
    description: '랭킹 기준값 (point, level 등))',
    example: 'point',
    enum: SortValues,
    default: SortValues.POINT,
  })
  @IsEnum(SortValues, { message: 'bad Sort value' })
  readonly sort: Sort = SortValues.POINT; // 여기 들어가는 기본 값은 사용자가 처음 들어왔을때 보여줄 페이지

  @ApiPropertyOptional({
    description: '페이지 번호 (1부터 시작)',
    example: 1,
    default: PaginationDefaults.PAGE_NUMBER,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = PaginationDefaults.PAGE_NUMBER;

  @ApiPropertyOptional({
    description: '페이지 크기',
    example: 5,
    default: PaginationDefaults.PAGE_LIMIT,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number = PaginationDefaults.PAGE_LIMIT;
}
