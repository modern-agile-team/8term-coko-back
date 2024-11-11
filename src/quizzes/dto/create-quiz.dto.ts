import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Category } from '@prisma/client';

export class CreateQuizDto {
  @IsInt()
  @Min(0)
  readonly partId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly question: string;

  @IsString({ each: true })
  readonly answerChoice: string[];

  @IsString({ each: true })
  readonly answer: string[];

  @IsEnum(Category, { message: 'bad category value' })
  readonly category: Category;
}
