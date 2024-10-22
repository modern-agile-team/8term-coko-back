import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
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

  private async findProgressByCompositeId(userId: number, quizId: number) {
    const progress = await this.prisma.progress.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
    });

    return progress;
  }

  async findAll(userId: number, query: QueryProgressDto) {
    const { sectionId } = query;

    await this.findUserById(userId);

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    return this.prisma.progress.findMany({
      where: {
        ...(sectionId && { sectionId }),
      },
    });
  }

  async create(
    userId: number,
    quizId: number,
    data: CreateProgressDto,
    skipValidation?: boolean,
  ) {
    const { sectionId } = data;

    if (!skipValidation) {
      await this.findUserById(userId);

      await this.findSectionById(sectionId);

      await this.findQuizById(quizId);

      await this.findProgressByCompositeId(userId, quizId);
    }

    return this.prisma.progress.create({
      data: {
        userId,
        quizId,
        ...data,
      },
    });
  }

  async update(
    userId: number,
    quizId: number,
    data: CreateProgressDto,
    skipValidation?: boolean,
  ) {
    const { sectionId } = data;

    if (!skipValidation) {
      await this.findUserById(userId);

      await this.findSectionById(sectionId);

      await this.findQuizById(quizId);

      await this.findProgressByCompositeId(userId, quizId);
    }

    return this.prisma.progress.update({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
      data: {
        userId,
        quizId,
        ...data,
      },
    });
  }

  async createOrUpdate(
    userId: number,
    quizId: number,
    data: CreateProgressDto,
  ) {
    const { sectionId } = data;

    await this.findUserById(userId);

    await this.findSectionById(sectionId);

    await this.findQuizById(quizId);

    const progress = await this.findProgressByCompositeId(userId, quizId);

    return progress
      ? this.update(userId, quizId, data, true)
      : this.create(userId, quizId, data, true);
  }
}
