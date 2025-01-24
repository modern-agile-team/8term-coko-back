import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Sort, SortValues } from '../entities/ranking.entity';
import { PaginationDefaults } from 'src/common/constants/rankings-constants';

export class RankingQueryDto {
  @ApiProperty({
    description: '랭킹 기준값 (point, level 등))',
    example: 'point',
    enum: SortValues,
  })
  @IsEnum(SortValues, { message: 'bad Sort value' })
  @Transform(({ value }) => value || SortValues.POINT) // 여기 들어가는 기본 값은 사용자가 처음 들어왔을때 보여줄 페이지
  readonly sort: Sort;

  @ApiProperty({
    description: '페이지 번호 (1부터 시작)',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform(({ value }) => value || PaginationDefaults.PAGE_NUMBER)
  readonly page: number;

  @ApiProperty({
    description: '페이지 크기 (1부터 시작)',
    example: 5,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform(({ value }) => value || PaginationDefaults.PAGE_LIMIT)
  readonly limit: number;
}
