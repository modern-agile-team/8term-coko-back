import { ApiProperty } from '@nestjs/swagger';
import { UserRankingsDto } from './user-rankings.dto';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

export class RankingPaginationResponseDto extends OffsetPaginationBaseResponseDto<UserRankingsDto> {
  @ApiProperty({
    description: '조회된 랭킹 목록',
  })
  readonly contents: UserRankingsDto[];

  constructor(props: Omit<RankingPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
// export class ResRankingsDto {
//   @ApiProperty({
//     description: '전체 사용자 수',
//     example: 7,
//   })
//   readonly totalCount: number;

//   @ApiProperty({
//     description: '총 페이지 수',
//     example: 2,
//   })
//   readonly totalPages: number;

//   @ApiProperty({
//     description: '현재 페이지 번호',
//     example: 1,
//   })
//   readonly currentPage: number;

//   @ApiProperty({
//     description: '랭킹 데이터',
//     type: [UserRankingsDto], // 배열 타입으로 정의
//   })
//   readonly rankings: UserRankingsDto[];

//   constructor(resRankingDto: ResRankingsDto) {
//     this.totalCount = resRankingDto.totalCount;
//     this.totalPages = resRankingDto.totalPages;
//     this.currentPage = resRankingDto.currentPage;
//     this.rankings = resRankingDto.rankings;
//   }
// }
