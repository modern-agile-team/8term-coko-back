import { DailyQuest } from '../daily-quests.interpace';

export interface UserDailyQuest {
  id: number;
  userId: number;
  dailyQuestId: number;
  conditionProgress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDailyQuestWiteQuestInfo extends UserDailyQuest {
  dailyQuest: DailyQuest;
}
