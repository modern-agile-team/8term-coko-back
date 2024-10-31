import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  private async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
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
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return quiz;
  }

  private async findSectionById(id: number) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  private async findPartById(id: number) {
    const part = await this.prisma.part.findUnique({
      where: {
        id,
      },
    });

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async findAll(userId: number, query: QueryProgressDto) {
    const { sectionId, partId } = query;

    await this.findUserById(userId);

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    if (partId) {
      await this.findPartById(partId);
    }

    return this.prisma.progress.findMany({
      where: {
        userId,
        quiz: {
          part: {
            ...(partId && { id: partId }),
            section: {
              ...(sectionId && { id: sectionId }),
            },
          },
        },
      },
    });
  }

  async createOrUpdate(
    userId: number,
    quizId: number,
    data: CreateProgressDto,
  ) {
    await this.findQuizById(quizId);

    await this.findUserById(userId);

    return this.prisma.progress.upsert({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
      create: {
        userId,
        quizId,
        ...data,
      },
      update: {
        userId,
        quizId,
        ...data,
      },
    });
  }
}
