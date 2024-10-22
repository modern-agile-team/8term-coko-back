import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Difficulty, Category } from '@prisma/client';

export class CreateQuizDto {
  @IsNumber()
  readonly sectionId: number;

  @IsEnum(Difficulty, { message: 'bad Difficulty value' })
  readonly difficulty: Difficulty;

  @IsString()
  readonly title: string;

  @IsString()
  readonly question: string;

  @IsString({ each: true })
  readonly answerChoice: string[];

  @IsString({ each: true })
  readonly answer: string[];

  @IsEnum(Category, { message: '잘못된 category value' })
  readonly category: Category;
}
