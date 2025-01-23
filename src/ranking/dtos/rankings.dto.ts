import { IsIn, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RankingsDto {
  @ApiProperty({
    description: '랭킹 기준값 (point, level 등))',
    example: 'point',
  })
  @IsIn(['level', 'point'])
  readonly sortType: string;

  @ApiProperty({
    description: '페이지 번호 (1부터 시작)',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pageNumber: number;
}
