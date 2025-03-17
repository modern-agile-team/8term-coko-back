import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { Progress } from './entities/progress.entity';

@Injectable()
export class ProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countProgressByUserIdAndDate(
    userId: number,
    targetDate: Date,
  ): Promise<number> {
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.progress.count({
      where: {
        userId,
        isCorrect: true,
        updatedAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }

  async countProgressByQuery(
    userId: number,
    query: QueryProgressDto,
    option?: { isCorrect: boolean },
  ): Promise<number> {
    const { sectionId, partId } = query;

    return this.prisma.progress.count({
      where: {
        userId,
        ...option,
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

  async upsertProgress(
    userId: number,
    quizId: number,
    body: CreateProgressDto,
  ): Promise<Progress> {
    return this.prisma.progress.upsert({
      where: { userId_quizId: { userId, quizId } },
      create: { userId, quizId, ...body },
      update: { userId, quizId, ...body },
    });
  }
}
