import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryQuizDto } from './dto/query-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  private async findSectionById(id: number) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section.id;
  }

  async create(quizData: CreateQuizDto) {
    const { sectionId, ...orders } = quizData;

    await this.findSectionById(sectionId);

    return this.prisma.quiz.create({
      data: {
        sectionId,
        ...orders,
      },
    });
  }

  async findAll(query: QueryQuizDto) {
    const { sectionId, difficulty } = query;

    if (sectionId) {
      await this.findSectionById(sectionId);
    }

    return this.prisma.quiz.findMany({
      where: {
        ...(sectionId && { sectionId }),
        ...(difficulty && { difficulty }),
      },
    });
  }

  async findQuizById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return quiz;
  }

  async update(id: number, quizData: UpdateQuizDto) {
    const { sectionId, ...orders } = quizData;

    await this.findSectionById(sectionId);

    await this.findQuizById(id);

    return this.prisma.quiz.update({
      where: {
        id,
      },
      data: {
        sectionId,
        ...orders,
      },
    });
  }

  async remove(id: number) {
    await this.findQuizById(id);

    return this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }
}
