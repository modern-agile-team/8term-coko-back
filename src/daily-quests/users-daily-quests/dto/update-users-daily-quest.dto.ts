import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateUsersDailyQuestDto {
  @ApiProperty({
    description: '현재 퀘스트완료 진행도, 예를들어 0/5 일때 0부분임',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(1000)
  readonly conditionProgress: number;

  constructor(conditionProgress: number) {
    this.conditionProgress = conditionProgress;
  }
}
