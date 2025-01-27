import { ApiProperty } from '@nestjs/swagger';
import { DailyQuest } from '../daily-quests.interpace';

export class ResDailyQuestDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: '제목' })
  readonly title: string;

  @ApiProperty({ example: '문제 5개를 푸세요' })
  readonly content: string;

  @ApiProperty({ example: 1000 })
  readonly point: number;

  @ApiProperty({ example: 100 })
  readonly exp: number;

  @ApiProperty({ example: 5 })
  readonly condition: number;

  constructor(dailyQuest: DailyQuest) {
    this.id = dailyQuest.id;
    this.title = dailyQuest.title;
    this.content = dailyQuest.content;
    this.point = dailyQuest.point;
    this.exp = dailyQuest.exp;
    this.condition = dailyQuest.condition;
  }

  static fromArray(dailyQuests: DailyQuest[]): ResDailyQuestDto[] {
    return dailyQuests.map((dailyQuest) => new ResDailyQuestDto(dailyQuest));
  }
}
