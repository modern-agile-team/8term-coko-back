import { ApiProperty } from '@nestjs/swagger';
import { ResOpinionsWithEmailDto } from './res-opinions-with-email.dto';

export class ResOpinionsDto {
  @ApiProperty({
    description: '총 문의 개수',
    example: 3,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: '조회된 문의 목록',
    type: [ResOpinionsWithEmailDto],
  })
  readonly opinions: ResOpinionsWithEmailDto[];

  constructor(totalCount: number, opinions: ResOpinionsWithEmailDto[]) {
    this.totalCount = totalCount;
    this.opinions = opinions;
  }

  static fromArray(
    totalCount: number,
    opinions: ResOpinionsWithEmailDto[],
  ): ResOpinionsDto {
    return new ResOpinionsDto(totalCount, opinions);
  }
}
