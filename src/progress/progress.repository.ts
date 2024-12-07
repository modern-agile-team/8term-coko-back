import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';

@Injectable()
export class ProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countProgressByQuery(
    userId: number,
    query: QueryProgressDto,
    option?: { isCorrect: boolean },
  ) {
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
  ) {
    return this.prisma.progress.upsert({
      where: { userId_quizId: { userId, quizId } },
      create: { userId, quizId, ...body },
      update: { userId, quizId, ...body },
    });
  }
}
