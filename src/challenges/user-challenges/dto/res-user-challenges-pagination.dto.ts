import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

import { ApiProperty } from '@nestjs/swagger';
import { ResUserChallengesDto } from './res-user-challenges.dto';
import { PaginationUserChallenges } from '../user-challenges.interface';

export class ResUserChallengesPaginationDto extends OffsetPaginationBaseResponseDto<ResUserChallengesDto> {
  @ApiProperty({
    description: '조회된 도전과제 목록',
    type: [ResUserChallengesDto],
  })
  readonly contents: ResUserChallengesDto[];

  constructor(props: PaginationUserChallenges) {
    super(props);
    this.contents = ResUserChallengesDto.fromArray(props.contents);
  }
}
