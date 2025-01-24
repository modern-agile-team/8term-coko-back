import { Injectable } from '@nestjs/common';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DailyQuest } from './daily-quests.interpace';

@Injectable()
export class DailyQuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DailyQuest[]> {
    return this.prisma.dailyQuest.findMany();
  }

  async findOne(id: number): Promise<DailyQuest> {
    return this.prisma.dailyQuest.findUnique({
      where: { id },
    });
  }

  async create(data: CreateDailyQuestDto): Promise<DailyQuest> {
    return this.prisma.dailyQuest.create({ data });
  }

  async update(id: number, data: UpdateDailyQuestDto): Promise<DailyQuest> {
    return this.prisma.dailyQuest.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<DailyQuest> {
    return this.prisma.dailyQuest.delete({
      where: { id },
    });
  }
}
