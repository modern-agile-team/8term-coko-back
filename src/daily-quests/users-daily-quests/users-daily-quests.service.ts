import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';
import { UsersDailyQuestsRepository } from './users-daily-quests.repository';
import { DailyQuestsRepository } from '../daily-quests.repository';
import { Cron } from '@nestjs/schedule';
import {
  UserDailyQuest,
  UserDailyQuestWiteQuestInfo,
} from './user-daily-quests.interpace';

@Injectable()
export class UsersDailyQuestsService {
  constructor(
    private readonly dailyQuestsRepository: DailyQuestsRepository,
    private readonly usersDailyQuestsRepository: UsersDailyQuestsRepository,
  ) {}
  async findOne(userDailyQuestId: number): Promise<UserDailyQuest> {
    const userDailyQuest =
      await this.usersDailyQuestsRepository.findOneById(userDailyQuestId);

    if (!userDailyQuest) {
      throw new NotFoundException(
        `userDailyQuestId: ${userDailyQuestId} 은(는) 없습니다.`,
      );
    }

    return userDailyQuest;
  }

  async findAll(userId: number): Promise<UserDailyQuestWiteQuestInfo[]> {
    const usersDailyQuests =
      await this.usersDailyQuestsRepository.findAllByUserId(userId);

    if (usersDailyQuests.length) {
      return usersDailyQuests;
    }

    const newUsersDailyQuests = await this.createRandomUserDailyQuest(userId);
    return [newUsersDailyQuests];
  }

  async createRandomUserDailyQuest(
    userId: number,
  ): Promise<UserDailyQuestWiteQuestInfo> {
    const allQuests = await this.dailyQuestsRepository.findAll();

    if (allQuests.length === 0) {
      throw new NotFoundException(
        '일일퀘스트 목록이 없어 유저일일퀘스트를 생성 할 수 없습니다.',
      );
    }

    // 랜덤하게 하나의 퀘스트 선택
    const randomIndex = Math.floor(Math.random() * allQuests.length);
    const { id } = allQuests[randomIndex];

    return this.usersDailyQuestsRepository.create(userId, id);
  }

  async update(
    userDailyQuestId: number,
    body: UpdateUsersDailyQuestDto,
  ): Promise<UserDailyQuestWiteQuestInfo> {
    const { conditionProgress } = body;
    const { dailyQuestId } = await this.findOne(userDailyQuestId);
    const dailyQuest = await this.dailyQuestsRepository.findOne(dailyQuestId);

    if (dailyQuest.condition <= conditionProgress) {
      const newBody = { ...body, completed: true };

      return this.usersDailyQuestsRepository.updateById(
        userDailyQuestId,
        newBody,
      );
    }

    const newBody = { ...body, completed: false };

    return this.usersDailyQuestsRepository.updateById(
      userDailyQuestId,
      newBody,
    );
  }

  @Cron('0 15 * * *') // UTC 15시 === KST 00시
  async deleteAllDailyQuests(): Promise<{ count: number }> {
    return this.usersDailyQuestsRepository.deleteAll();
  }
}
