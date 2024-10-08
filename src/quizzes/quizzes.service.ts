import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { part as PartEnum } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(
    sectionId: number,
    part: string,
    title: string,
    question: string,
    answerChoice: string[],
    answer: string[],
    category: string,
  ) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }
    const enumPart = PartEnum[part as keyof typeof PartEnum];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

    return this.prisma.quizzes.create({
      data: {
        sectionId,
        part: enumPart,
        title,
        question,
        answerChoice,
        answer,
        category,
      },
    });
  }

  findAll() {
    return this.prisma.quizzes.findMany();
  }

  async findSection(sectionName: string) {
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

  async findSectionPart(sectionName: string, part: string) {
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    const enumPart = PartEnum[part as keyof typeof PartEnum];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

    return this.prisma.quizzes.findMany({
      where: {
        sectionId: section.id,
        part: enumPart,
      },
    });
  }

  async findSectionPartId(sectionName: string, part: string, id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    const enumPart = PartEnum[part as keyof typeof PartEnum];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

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
        part: enumPart,
      },
    });
  }

  async update(
    id: number,
    sectionId: number,
    part: string,
    title: string,
    question: string,
    answerChoice: string[],
    answer: string[],
    category: string,
  ) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }
    const enumPart = PartEnum[part as keyof typeof PartEnum];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

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
        part: enumPart,
        title,
        question,
        answerChoice,
        answer,
        category,
      },
    });
  }

  async remove(id: number) {
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
