import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-quiz.dto';
import { UpdateQuestionDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  create(
    partId: number,
    sectionId: number,
    title: string,
    question: string,
    answerChoice: string[],
    answer: string[],
    category: string,
  ) {
    return this.prisma.quizzes.create({
      data: {
        partId,
        sectionId,
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

  update(id: number) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
