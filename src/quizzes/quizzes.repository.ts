import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllQuizByQuery() {}

  async createQuiz() {}

  async findQuizById() {}

  async findAllIncorrectProgressByQuery() {}

  async updateQuiz() {}

  async deleteQuiz() {}
}
