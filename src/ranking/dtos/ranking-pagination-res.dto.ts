import { ApiProperty } from '@nestjs/swagger';
import { UserRankingDto } from './user-ranking.dto';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from 'src/users/entities/user-item.entity';

export class RankingPaginationResponseDto extends OffsetPaginationBaseResponseDto<UserRankingDto> {
  @ApiProperty({
    description: '조회된 랭킹 목록',
    type: [UserRankingDto],
  })
  readonly contents: UserRankingDto[];

  @ApiProperty({
    description: '조회된 유저의 장착아이템 목록',
    type: [UserItem],
  })
  readonly equippedItems: UserItem[];

  constructor(props: Omit<RankingPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
    this.equippedItems = props.equippedItems;
  }
}
