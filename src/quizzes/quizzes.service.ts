import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { QuizzesRepository } from './quizzes.repository';
import { Quiz } from './entities/quizzes.entity';
import { SectionsService } from 'src/sections/sections.service';
import { PartsService } from 'src/parts/parts.service';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsService: SectionsService,
    private readonly partsService: PartsService,
    private readonly quizzesRepository: QuizzesRepository,
  ) {}
  async findAll(query: QueryQuizDto): Promise<Quiz[]> {
    const { sectionId, partId } = query;

    if (sectionId) {
      await this.sectionsService.findOne(sectionId);
    }

    if (partId) {
      await this.partsService.findOne(partId);
    }

    return this.quizzesRepository.findAllQuizByQuery(query);
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findOneById(id);

    if (!quiz) {
      throw new NotFoundException();
    }

    return quiz;
  }

  async findAllProgressIncorrect(
    userId: number,
    query: QueryQuizDto,
  ): Promise<Quiz[]> {
    const { sectionId, partId } = query;

    if (sectionId) {
      await this.sectionsService.findOne(sectionId);
    }

    if (partId) {
      await this.partsService.findOne(partId);
    }

    // 이 부분은 추후 수정사항
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저');
    }
    //

    return this.quizzesRepository.findAllIncorrectProgressByQuery(
      userId,
      query,
    );
  }

  async create(body: CreateQuizDto): Promise<Quiz> {
    const { partId } = body;

    await this.partsService.findOne(partId);

    return this.quizzesRepository.createQuiz(body);
  }

  async update(id: number, body: UpdateQuizDto): Promise<Quiz> {
    const { partId } = body;

    await this.findOne(id);

    await this.partsService.findOne(partId);

    return this.quizzesRepository.updateQuizById(id, body);
  }

  async remove(id: number): Promise<Quiz> {
    await this.findOne(id);

    return this.quizzesRepository.deleteQuizById(id);
  }
}
