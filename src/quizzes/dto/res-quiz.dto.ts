import { ApiProperty } from '@nestjs/swagger';
import { Category, Quiz } from '../entities/quizzes.entity';

export class ResQuizDto {
  @ApiProperty({ example: 10 })
  readonly id: number;

  @ApiProperty({ example: 5 })
  readonly partId: number;

  @ApiProperty({ example: '문제의 출력 결과는?' })
  readonly title: string;

  @ApiProperty({
    example: 'const a = 10;\nlet b = "안녕";\nconsole.log(`${a}는${b}`);',
  })
  readonly question: string;

  @ApiProperty({ example: ['10는안녕'] })
  readonly answer: string[];

  @ApiProperty({ example: [] })
  readonly answerChoice: string[];

  @ApiProperty({ example: 'SHORT_ANSWER', description: '전체 문제 수' })
  readonly category: Category;

  constructor(resQuizDto: Quiz) {
    this.id = resQuizDto.id;
    this.partId = resQuizDto.partId;
    this.title = resQuizDto.title;
    this.question = resQuizDto.question;
    this.answer = resQuizDto.answer;
    this.answerChoice = resQuizDto.answerChoice;
    this.category = resQuizDto.category;
  }

  static fromArray(quizzes: Quiz[]): ResQuizDto[] {
    return quizzes.map((quiz) => new ResQuizDto(quiz));
  }
}
