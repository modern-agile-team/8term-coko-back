import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Part } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(quizData: CreateQuizDto) {
    const { sectionId, ...orders } = quizData;

    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return this.prisma.quizzes.create({
      data: {
        sectionId,
        ...orders,
      },
    });
  }

  findAll() {
    return this.prisma.quizzes.findMany();
  }

  async findSection(sectionName: string) {
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return this.prisma.quizzes.findMany({
      where: {
        sectionId: section.id,
      },
    });
  }

  async findSectionPart(sectionName: string, part: Part) {
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return this.prisma.quizzes.findMany({
      where: {
        sectionId: section.id,
        part,
      },
    });
  }

  async findSectionPartId(sectionName: string, part: Part, id: number) {
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    //문제 있는지 확인
    const quiz = await this.prisma.quizzes.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return this.prisma.quizzes.findMany({
      where: {
        id: quiz.id,
        sectionId: section.id,
        part,
      },
    });
  }

  async update(id: number, quizData: UpdateQuizDto) {
    const { sectionId, ...orders } = quizData;

    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    // 문제 있는지 확인
    const quiz = await this.prisma.quizzes.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

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
    // 문제 있는지 확인
    const quiz = await this.prisma.quizzes.findUnique({
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException();
    }

    return this.prisma.quizzes.delete({
      where: {
        id,
      },
    });
  }
}
