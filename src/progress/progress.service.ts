import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProgressRepository } from './progress.repository';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { PartsService } from 'src/parts/parts.service';
import { SectionsService } from 'src/sections/sections.service';
import { QuizzesRepository } from 'src/quizzes/quizzes.repository';

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly progressRepository: ProgressRepository,
    private readonly sectionsService: SectionsService,
    private readonly partsService: PartsService,
    private readonly quizzesService: QuizzesService,
    private readonly quizzesRepository: QuizzesRepository,
  ) {}

  // 추후 수정사항
  private async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
  //

  async findAll(userId: number, query: QueryProgressDto) {
    const { sectionId, partId } = query;

    await this.findUserById(userId);

    if (sectionId) {
      await this.sectionsService.findOne(sectionId);
    }

    if (partId) {
      await this.partsService.findOne(partId);
    }

    const totalQuizCount = await this.quizzesRepository.countQuizByQuery(query);

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
    await this.quizzesService.findOne(quizId);

    await this.findUserById(userId);

    return this.progressRepository.upsertProgress(userId, quizId, body);
  }
}
