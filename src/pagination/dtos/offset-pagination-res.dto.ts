import { ApiProperty } from '@nestjs/swagger';

export abstract class OffsetPaginationBaseResponseDto<T> {
  @ApiProperty({
    description: '조회된 전체 데이터 수',
    example: 7,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: '총 페이지 수',
    example: 2,
  })
  readonly totalPage: number;

  @ApiProperty({
    description: '현재 페이지 번호',
    example: 1,
  })
  readonly currentPage: number;

  @ApiProperty({
    description: '페이지 사이즈',
    example: 5,
  })
  readonly limit: number;

  abstract readonly contents: T[];

  constructor(
    props: Omit<OffsetPaginationBaseResponseDto<T>, 'totalPage'> & {
      totalPage?: number;
    },
  ) {
    this.totalCount = props.totalCount;
    this.totalPage =
      props.totalPage ?? Math.ceil(props.totalCount / props.limit);
    this.currentPage = props.currentPage;
  }
}
