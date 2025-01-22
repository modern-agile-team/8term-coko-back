import { DailyQuestModel } from '../daily-quests.interpace';

export class DailyQuest implements DailyQuestModel {
  id: number;
  title: String;
  content: String;
  point: number;
  exp: number;
  condition: number;
}
