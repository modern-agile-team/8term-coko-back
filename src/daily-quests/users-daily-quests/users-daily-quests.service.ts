import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';
import { UsersDailyQuestsRepository } from './users-daily-quests.repository';
import { DailyQuestsRepository } from '../daily-quests.repository';
import { Cron } from '@nestjs/schedule';
import {
  UserDailyQuest,
  UserDailyQuestWiteQuestInfo,
} from './users-daily-quests.interface';
import { DAILY_RESET } from './const/users-daily-quests.const';
import { OnEvent } from '@nestjs/event-emitter';
import { Progress } from 'src/progress/entities/progress.entity';
import { ProgressRepository } from 'src/progress/progress.repository';
import { EVENT } from 'src/common/constants/event-constants';
import { UserPointService } from 'src/users/services/user-point.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersDailyQuestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly progressRepository: ProgressRepository,
    private readonly dailyQuestsRepository: DailyQuestsRepository,
    private readonly usersDailyQuestsRepository: UsersDailyQuestsRepository,
    private readonly userPointService: UserPointService,
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

    const newUserDailyQuest = await this.createRandomUserDailyQuest(userId);
    return [newUserDailyQuest];
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

  async update(userId: number): Promise<UserDailyQuestWiteQuestInfo | null> {
    const [userDailyQuest] = await this.findAll(userId);

    if (!userDailyQuest) return null;

    // 완료된 퀘스트는 업데이트하지 않음
    if (userDailyQuest.completed) return null;

    const today = new Date();
    const isCorrectTrueCount =
      await this.progressRepository.countProgressByUserIdAndDate(userId, today);

    const shouldBeCompleted =
      userDailyQuest.dailyQuest.condition <= isCorrectTrueCount;

    const conditionProgress = shouldBeCompleted
      ? userDailyQuest.dailyQuest.condition
      : isCorrectTrueCount;

    const updatedData: UpdateUsersDailyQuestDto = {
      conditionProgress,
      completed: shouldBeCompleted,
    };

    return this.prisma.$transaction(async (tx) => {
      if (shouldBeCompleted) {
        await this.userPointService.updatePoint(
          userId,
          {
            point: userDailyQuest.dailyQuest.point,
          },
          tx,
        );
      }

      return this.usersDailyQuestsRepository.updateById(
        userDailyQuest.id,
        updatedData,
        tx,
      );
    });
  }

  @Cron(DAILY_RESET)
  async deleteAllDailyQuests(): Promise<{ count: number }> {
    return this.usersDailyQuestsRepository.deleteAll();
  }

  @OnEvent(EVENT.PROGRESS.UPDATED)
  async handleProgressUpdatedEvent(progress: Progress) {
    await this.update(progress.userId);
  }
}
