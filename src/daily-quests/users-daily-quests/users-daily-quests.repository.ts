import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';

@Injectable()
export class UsersDailyQuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: number) {
    return this.prisma.userDailyQuest.findMany({
      where: { userId },
    });
  }

  async findOneById(id: number) {
    return this.prisma.userDailyQuest.findUnique({
      where: { id },
    });
  }

  async create(userId: number, dailyQuestId: number) {
    return this.prisma.userDailyQuest.create({
      data: { userId, dailyQuestId },
    });
  }

  async updateById(id: number, body: UpdateUsersDailyQuestDto) {
    return this.prisma.userDailyQuest.update({
      where: { id },
      data: { ...body },
    });
  }

  async deleteAll() {
    return this.prisma.userDailyQuest.deleteMany();
  }
}
