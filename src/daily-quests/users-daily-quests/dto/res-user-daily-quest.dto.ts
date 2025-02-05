import { ApiProperty } from '@nestjs/swagger';
import { DailyQuest } from 'src/daily-quests/daily-quests.interpace';
import { ResDailyQuestDto } from 'src/daily-quests/dto/res-daily-quest.dto';
import { UserDailyQuestWiteQuestInfo } from '../user-daily-quests.interpace';

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

  @ApiProperty({ example: 1 })
  readonly dailyQuest: ResDailyQuestDto;

  constructor(userDailyQuest: UserDailyQuestWiteQuestInfo) {
    this.id = userDailyQuest.id;
    this.userId = userDailyQuest.userId;
    this.dailyQuestId = userDailyQuest.dailyQuestId;
    this.conditionProgress = userDailyQuest.conditionProgress;
    this.completed = userDailyQuest.completed;
    this.dailyQuest = new ResDailyQuestDto(userDailyQuest.dailyQuest);
  }

  static fromArray(userDailyQuests: UserDailyQuestWiteQuestInfo[]) {
    return userDailyQuests.map(
      (userDailyQuest) => new ResUserDailyQuestDto(userDailyQuest),
    );
  }
}
