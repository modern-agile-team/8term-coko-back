import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllQuizByQuery(sectionId: number, partId: number) {
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
    sectionId: number,
    partId: number,
  ) {
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

  async findOneById(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  async createQuiz(data: CreateQuizDto) {
    return this.prisma.quiz.create({
      data,
    });
  }

  async updateQuizById(id: number, data: UpdateQuizDto) {
    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async deleteQuizById(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
