import { DailyQuest } from '../daily-quests.interpace';

export class DailyQuestEntity implements DailyQuest {
  id: number;
  title: string;
  content: string;
  point: number;
  exp: number;
  condition: number;
  createdAt: Date;
  updatedAt: Date;
}
