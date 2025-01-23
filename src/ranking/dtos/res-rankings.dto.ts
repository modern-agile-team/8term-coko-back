import { ApiProperty } from '@nestjs/swagger';
import { UserRankingsDto } from './user-rankings.dto';

export class ResRankingsDto {
  @ApiProperty({
    description: '전체 사용자 수',
    example: 7,
  })
  totalCount: number;

  @ApiProperty({
    description: '총 페이지 수',
    example: 2,
  })
  totalPages: number;

  @ApiProperty({
    description: '현재 페이지 번호',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: '랭킹 데이터',
    type: [UserRankingsDto], // 배열 타입으로 정의
  })
  rankings: UserRankingsDto[];
}
