import { IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Sort, SortValues } from '../entities/ranking.entity';

export class RankingQueryDto {
  @ApiProperty({
    description: '랭킹 기준값 (point, level 등))',
    example: 'point',
    enum: SortValues,
  })
  @IsEnum(SortValues, { message: 'bad Sort value' })
  readonly sort: Sort;

  @ApiProperty({
    description: '페이지 번호 (1부터 시작)',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number;
}
