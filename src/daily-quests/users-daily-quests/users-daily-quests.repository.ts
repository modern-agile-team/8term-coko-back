import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';
import {
  UserDailyQuest,
  UserDailyQuestWiteQuestInfo,
} from './users-daily-quests.interface';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';

@Injectable()
export class UsersDailyQuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(
    userId: number,
  ): Promise<UserDailyQuestWiteQuestInfo[]> {
    return this.prisma.userDailyQuest.findMany({
      where: { userId },
      include: { dailyQuest: true },
    });
  }

  async findOneById(id: number): Promise<UserDailyQuest> {
    return this.prisma.userDailyQuest.findUnique({
      where: { id },
    });
  }

  async create(
    userId: number,
    dailyQuestId: number,
  ): Promise<UserDailyQuestWiteQuestInfo> {
    return this.prisma.userDailyQuest.create({
      data: { userId, dailyQuestId },
      include: { dailyQuest: true },
    });
  }

  async updateById(
    id: number,
    body: UpdateUsersDailyQuestDto,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ): Promise<UserDailyQuestWiteQuestInfo> {
    return txOrPrisma.userDailyQuest.update({
      where: { id },
      data: { ...body },
      include: { dailyQuest: true },
    });
  }

  async deleteAll(): Promise<{ count: number }> {
    return this.prisma.userDailyQuest.deleteMany();
  }
}
