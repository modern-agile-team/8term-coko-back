import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class dailyQuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.dailyQuest.findMany();
  }

  async findOne(id: number) {
    return this.prisma.dailyQuest.findUnique({
      where: { id },
    });
  }

  async create(data: CreateDailyQuestDto) {
    return this.prisma.dailyQuest.create({ data });
  }

  async update(id: number, data: UpdateDailyQuestDto) {
    return this.prisma.dailyQuest.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.dailyQuest.delete({
      where: { id },
    });
  }
}
