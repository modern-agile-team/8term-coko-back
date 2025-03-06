import { ApiProperty } from '@nestjs/swagger';

export class ResSeasonEndTimeDto {
  @ApiProperty({
    description: '시즌 종료 시점을 나타내는 ISO 형식의 문자열',
    example: '2025-03-10T00:00:00.000Z',
  })
  readonly seasonEndTime: string;

  constructor(resSeasonEndTimeDto: ResSeasonEndTimeDto) {
    this.seasonEndTime = resSeasonEndTimeDto.seasonEndTime;
  }
}
