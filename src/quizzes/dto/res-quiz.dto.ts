import { Category } from '../entities/quizzes.entity';

export class ResQuizDto {
  readonly id: number;
  readonly partId: number;
  readonly title: string;
  readonly question: string;
  readonly answer: string[];
  readonly answerChoice: string[];
  readonly category: Category;

  constructor(resQuizDto: ResQuizDto) {
    this.id = resQuizDto.id;
    this.partId = resQuizDto.partId;
    this.title = resQuizDto.title;
    this.question = resQuizDto.question;
    this.answer = resQuizDto.answer;
    this.answerChoice = resQuizDto.answerChoice;
    this.category = resQuizDto.category;
  }

  static fromArray(quizzes: ResQuizDto[]): ResQuizDto[] {
    return quizzes.map((quiz) => new ResQuizDto(quiz));
  }
}
