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
