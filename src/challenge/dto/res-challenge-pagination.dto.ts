import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { ResChallengeDto } from './res-challenge.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResChallengePaginationDto extends OffsetPaginationBaseResponseDto<ResChallengeDto> {
  @ApiProperty({
    description: '조회된 도전과제 목록',
  })
  readonly contents: ResChallengeDto[];

  constructor(props: ResChallengePaginationDto) {
    super(props);
    this.contents = props.contents;
  }
}
