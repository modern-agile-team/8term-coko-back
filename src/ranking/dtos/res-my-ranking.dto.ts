import { ApiProperty } from '@nestjs/swagger';

export class ResMyRankingDto {
  @ApiProperty({
    description: '나의 순위',
    example: 7,
  })
  readonly myRanking: number;
}
