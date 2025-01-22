import { DailyQuest } from '../entities/daily-quest.entity';

export class ResDailyQuestDto {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly point: number;
  readonly exp: number;
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
