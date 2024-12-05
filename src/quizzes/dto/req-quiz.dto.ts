import { Category } from '@prisma/client';
import { CreateQuizDto } from './create-quiz.dto';
import { UpdateQuizDto } from './update-quiz.dto';

export class ReqQuizDto {
  readonly id: number;
  readonly partId: number;
  readonly title: string;
  readonly question: string;
  readonly answer: string[];
  readonly answerChoice: string[];
  readonly category: Category;

  constructor(id: number, body?: CreateQuizDto | UpdateQuizDto) {
    this.id = id;
    this.partId = body?.partId;
    this.title = body?.title;
    this.question = body?.question;
    this.answer = body?.answer;
    this.answerChoice = body?.answerChoice;
    this.category = body?.category;
  }
}
