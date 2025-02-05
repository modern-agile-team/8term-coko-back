import { ApiProperty } from '@nestjs/swagger';

export class ResUserDailyQuestDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 1 })
  readonly dailyQuestId: number;

  @ApiProperty({ example: 1 })
  readonly conditionProgress: number;

  @ApiProperty({ example: 1 })
  readonly completed: boolean;

  constructor(userDailyQuest) {
    this.id = userDailyQuest.id;
    this.userId = userDailyQuest.userId;
    this.dailyQuestId = userDailyQuest.dailyQuestId;
    this.conditionProgress = userDailyQuest.conditionProgress;
    this.completed = userDailyQuest.completed;
  }

  static fromArray(userDailyQuests) {
    return userDailyQuests.map(
      (userDailyQuest) => new ResUserDailyQuestDto(userDailyQuest),
    );
  }
}
