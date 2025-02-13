import { ApiProperty } from '@nestjs/swagger';
import { ResDailyQuestDto } from 'src/daily-quests/dto/res-daily-quest.dto';
import {
  UserDailyQuest,
  UserDailyQuestWiteQuestInfo,
} from '../users-daily-quests.interface';

export class ResUserDailyQuestDto
  implements Omit<UserDailyQuest, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 1 })
  readonly dailyQuestId: number;

  @ApiProperty({ example: 0 })
  readonly conditionProgress: number;

  @ApiProperty({ example: false })
  readonly completed: boolean;

  @ApiProperty({ type: [ResDailyQuestDto] })
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
