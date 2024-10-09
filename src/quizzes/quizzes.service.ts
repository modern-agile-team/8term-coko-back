import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Part } from '@prisma/client';
import { Category } from '@prisma/client';

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
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    //파트 있는지 확인
    part = part.replace('-', '_').toUpperCase();
    const enumPart = Part[part as keyof typeof Part];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

    //유형 있는지 확인
    category = category.replace('-', '_').toUpperCase();
    const enumCategory = Category[category as keyof typeof Category];

    if (!enumCategory) {
      throw new BadRequestException(`Invalid part value: ${category}`);
    }

    return this.prisma.quizzes.create({
      data: {
        sectionId,
        part: enumPart,
        title,
        question,
        answerChoice,
        answer,
        category: enumCategory,
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

  async findSectionPart(sectionName: string, part: string) {
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    //파트 있는지 확인
    part = part.replace('-', '_').toUpperCase();
    const enumPart = Part[part as keyof typeof Part];

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
    //섹션 있는지 확인
    const section = await this.prisma.sections.findUnique({
      where: {
        name: sectionName,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    //파트 있는지 확인
    part = part.replace('-', '_').toUpperCase();
    const enumPart = Part[part as keyof typeof Part];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
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

    //파트 있는지 확인
    part = part.replace('-', '_').toUpperCase();
    const enumPart = Part[part as keyof typeof Part];

    if (!enumPart) {
      throw new BadRequestException(`Invalid part value: ${part}`);
    }

    //유형 있는지 확인
    category = category.replace('-', '_').toUpperCase();
    const enumCategory = Category[category as keyof typeof Category];

    if (!enumCategory) {
      throw new BadRequestException(`Invalid part value: ${category}`);
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
        part: enumPart,
        title,
        question,
        answerChoice,
        answer,
        category: enumCategory,
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
