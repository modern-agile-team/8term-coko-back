import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { QuizzesRepository } from './quizzes.repository';
import { SectionsRepository } from 'src/sections/sections.repository';
import { PartsRepository } from 'src/parts/parts.repository';
import { Quiz } from './entities/quizzes.entity';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsRepository: SectionsRepository,
    private readonly partsRepository: PartsRepository,
    private readonly quizzesRepository: QuizzesRepository,
  ) {}

  private async findSectionById(id: number) {
    const section = await this.sectionsRepository.findOneSectionById(id);

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  private async findPartById(id: number) {
    const part = await this.partsRepository.findOnePartById(id);

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async findAll(query: QueryQuizDto): Promise<Quiz[]> {
    const { sectionId, partId } = query;

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    if (partId) {
      await this.findPartById(partId);
    }

    return this.quizzesRepository.findAllQuizByQuery(query);
  }

  async getQuiz(id: number): Promise<Quiz> {
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
      await this.findSectionById(sectionId);
    }

    if (partId) {
      await this.findPartById(partId);
    }

    // 이 부분은 수정사항
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    //

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저');
    }

    return this.quizzesRepository.findAllIncorrectProgressByQuery(
      userId,
      query,
    );
  }

  async create(body: CreateQuizDto): Promise<Quiz> {
    return this.quizzesRepository.createQuiz(body);
  }

  async update(id: number, data: UpdateQuizDto): Promise<Quiz> {
    const { partId } = data;

    await this.getQuiz(id);

    await this.findPartById(partId);

    return this.quizzesRepository.updateQuizById(id, data);
  }

  async remove(id: number): Promise<Quiz> {
    await this.getQuiz(id);

    return this.quizzesRepository.deleteQuizById(id);
  }
}
