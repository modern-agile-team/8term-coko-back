import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { ResChallengeDto } from './res-challenge.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationChallenge } from '../challenge.interface';

export class ResChallengePaginationDto extends OffsetPaginationBaseResponseDto<ResChallengeDto> {
  @ApiProperty({
    description: '조회된 도전과제 목록',
    type: [ResChallengeDto],
  })
  readonly contents: ResChallengeDto[];

  constructor(props: PaginationChallenge) {
    super(props);
    this.contents = ResChallengeDto.fromArray(props.contents);
  }
}
