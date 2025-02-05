export interface UserDailyQuest {
  id: number;
  userId: number;
  dailyQuestId: number;
  conditionProgress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
