import { DailyQuestModel } from '../daily-quests.interpace';

export class DailyQuest implements DailyQuestModel {
  id: number;
  title: string;
  content: string;
  point: number;
  exp: number;
  condition: number;
}
