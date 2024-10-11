import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Part } from '@prisma/client';
import { QueryQuizDto } from './dto/query-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async findSectionById(id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section.id;
  }

  async findSectionByName(name: string) {
    const section = await this.prisma.sections.findUnique({
      where: {
        name,
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

    return this.prisma.quizzes.create({
      data: {
        sectionId,
        ...orders,
      },
    });
  }

  async findAll(query: QueryQuizDto) {
    const { sectionId, part } = query;

    return this.prisma.quizzes.findMany({
      where: {
        ...(sectionId && { sectionId }),
        ...(part && { part }),
      },
    });
  }

  async findQuizById(id: number) {
    const quiz = this.prisma.quizzes.findUnique({
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

    return this.prisma.quizzes.update({
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

    return this.prisma.quizzes.delete({
      where: {
        id,
      },
    });
  }
}
