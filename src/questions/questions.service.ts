import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  create(
    partId: number,
    sectionId: number,
    title: string,
    question: string,
    answer: string,
    category: string,
  ) {
    return this.prisma.questions.create({
      data: {
        partId,
        sectionId,
        title,
        question,
        answer,
        category,
      },
    });
  }

  findAll() {
    return this.prisma.questions.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
