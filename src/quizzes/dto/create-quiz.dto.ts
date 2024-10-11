import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Part, Category } from '@prisma/client';

export class CreateQuizDto {
  @IsNumber()
  readonly sectionId: number;

  @IsEnum(Part, { message: '잘못된 part value' })
  readonly part: Part;

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
