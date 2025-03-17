import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { ResChallengesDto } from './res-challenges.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationChallenges } from '../challenges.interface';

export class ResChallengesPaginationDto extends OffsetPaginationBaseResponseDto<ResChallengesDto> {
  @ApiProperty({
    description: '조회된 도전과제 목록',
    type: [ResChallengesDto],
  })
  readonly contents: ResChallengesDto[];

  constructor(props: PaginationChallenges) {
    super(props);
    this.contents = ResChallengesDto.fromArray(props.contents);
  }
}
