import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quizzes.entity';
import { QueryQuizDto } from './dto/query-quiz.dto';

@Injectable()
export class QuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllQuizByQuery(query: QueryQuizDto): Promise<Quiz[]> {
    const { sectionId, partId } = query;

    return this.prisma.quiz.findMany({
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

  async findAllIncorrectProgressByQuery(
    userId: number,
    query: QueryQuizDto,
  ): Promise<Quiz[]> {
    const { sectionId, partId } = query;

    return this.prisma.quiz.findMany({
      where: {
        progress: {
          some: {
            isCorrect: false,
            userId,
          },
        },
        part: {
          ...(partId && { id: partId }),
          section: {
            ...(sectionId && { id: sectionId }),
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<Quiz> {
    return this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  async createQuiz(data: CreateQuizDto): Promise<Quiz> {
    return this.prisma.quiz.create({
      data,
    });
  }

  async updateQuizById(id: number, data: UpdateQuizDto): Promise<Quiz> {
    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async deleteQuizById(id: number): Promise<Quiz> {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
