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

  create(
    sectionId: number,
    part: string,
    title: string,
    question: string,
    answerChoice: string[],
    answer: string[],
    category: string,
  ) {
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

  findOne(id: number) {
    return `This action returns a #${id} question`;
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

  update(id: number) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return this.prisma.quizzes.delete({
      where: {
        id,
      },
    });
  }
}
