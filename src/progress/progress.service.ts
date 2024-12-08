import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgressRepository } from './progress.repository';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { PartsService } from 'src/parts/parts.service';
import { SectionsService } from 'src/sections/sections.service';

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly progressRepository: ProgressRepository,
    private readonly quizzesService: QuizzesService,
    private readonly partsService: PartsService,
    private readonly sectionsService: SectionsService,
  ) {}

  //
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
  //

  //
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
  //

  //
  private async countQuizBySectionIdOrPartId(query: QueryProgressDto) {
    const { sectionId, partId } = query;

    return this.prisma.quiz.count({
      where: {
        part: {
          ...(partId && { id: partId }),
          section: {
            ...(sectionId && { id: sectionId }),
          },
        },
      },
    });
  }
  //

  async findAll(userId: number, query: QueryProgressDto) {
    const { sectionId, partId } = query;

    await this.findUserById(userId);

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    if (partId) {
      await this.partsService.findOne(partId);
    }

    const totalQuizCount = await this.countQuizBySectionIdOrPartId(query);

    const totalUserProgressCount =
      await this.progressRepository.countProgressByQuery(userId, query);

    const correctUserProgressCount =
      await this.progressRepository.countProgressByQuery(userId, query, {
        isCorrect: true,
      });

    const inCorrectUserProgressCount =
      totalUserProgressCount - correctUserProgressCount;

    return {
      totalQuizCount,
      totalUserProgressCount,
      correctUserProgressCount,
      inCorrectUserProgressCount,
    };
  }

  async createOrUpdate(
    userId: number,
    quizId: number,
    body: CreateProgressDto,
  ) {
    await this.quizzesService.getQuiz(quizId);

    await this.findUserById(userId);

    return this.progressRepository.upsertProgress(userId, quizId, body);
  }
}
