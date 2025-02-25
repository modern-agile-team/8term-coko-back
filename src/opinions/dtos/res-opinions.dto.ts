import { ApiProperty } from '@nestjs/swagger';
import { ResMyOpinionsDto } from './res-my-opinions.dto';

export class ResOpinionsDto {
  @ApiProperty({
    description: '총 문의 개수',
    example: 3,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: '조회된 문의 목록',
    type: [ResMyOpinionsDto],
  })
  readonly opinions: ResMyOpinionsDto[];

  constructor(totalCount: number, opinions: ResMyOpinionsDto[]) {
    this.totalCount = totalCount;
    this.opinions = opinions;
  }

  static fromArray(
    totalCount: number,
    opinions: ResMyOpinionsDto[],
  ): ResOpinionsDto {
    return new ResOpinionsDto(totalCount, opinions);
  }
}
