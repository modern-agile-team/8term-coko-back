import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { ProgressRepository } from './progress.repository';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { PartsService } from 'src/parts/parts.service';
import { SectionsService } from 'src/sections/sections.service';
import { QuizzesRepository } from 'src/quizzes/quizzes.repository';
import { ResProgressDto } from './dto/res-progress.dto';
import { Progress } from './entities/progress.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT } from 'src/challenges/const/challenges.constant';

@Injectable()
export class ProgressService {
  constructor(
    private readonly progressRepository: ProgressRepository,
    private readonly sectionsService: SectionsService,
    private readonly partsService: PartsService,
    private readonly quizzesService: QuizzesService,
    private readonly quizzesRepository: QuizzesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(
    userId: number,
    query: QueryProgressDto,
  ): Promise<ResProgressDto> {
    const { sectionId, partId } = query;

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
  ): Promise<Progress> {
    await this.quizzesService.findOne(quizId);

    const progress = await this.progressRepository.upsertProgress(
      userId,
      quizId,
      body,
    );

    // 정답일 경우만 해당 이벤트 발행
    if (progress.isCorrect) {
      this.eventEmitter.emit('quiz.correct', {
        userId,
        isCorrect: progress.isCorrect,
      });
    } else {
      this.eventEmitter.emit(EVENT.QUIZ.INCORRECT, {
        userId,
        isCorrect: progress.isCorrect,
      });
    }

    // progress 업데이트가 완료된 후 이벤트 발행
    this.eventEmitter.emit(EVENT.PROGRESS.UPDATED, progress);

    return progress;
  }
}
