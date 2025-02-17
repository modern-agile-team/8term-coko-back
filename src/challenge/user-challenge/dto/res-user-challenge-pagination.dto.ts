import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

import { ApiProperty } from '@nestjs/swagger';
import { ResUserChallengeDto } from './res-user-challenge.dto';
import { PaginationUserChallenge } from '../user-challenge.interface';

export class ResUserChallengePaginationDto extends OffsetPaginationBaseResponseDto<ResUserChallengeDto> {
  @ApiProperty({
    description: '조회된 도전과제 목록',
    type: [ResUserChallengeDto],
  })
  readonly contents: ResUserChallengeDto[];

  constructor(props: PaginationUserChallenge) {
    super(props);
    this.contents = ResUserChallengeDto.fromArray(props.contents);
  }
}
