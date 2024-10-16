import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  private async findUserById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user.id;
  }

  private async findQuizById(id: number) {
    const quiz = await this.prisma.quizzes.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return quiz.id;
  }

  private async findSectionById(id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section.id;
  }

  async create(progressData: CreateProgressDto) {
    const { userId, sectionId, questionsId, ...orders } = progressData;

    await this.findUserById(userId);

    await this.findSectionById(sectionId);

    await this.findQuizById(questionsId);

    return this.prisma.progress.create({
      data: {
        userId,
        sectionId,
        questionsId,
        ...orders,
      },
    });
  }
  }

  findAll(query: QueryProgressDto) {
    return await `This action returns all progress`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} progress`;
  }

  async update(id: number, progressData: UpdateProgressDto) {
    return `This action updates a #${id} progress`;
  }

  async remove(id: number) {
    return `This action removes a #${id} progress`;
  }
}
