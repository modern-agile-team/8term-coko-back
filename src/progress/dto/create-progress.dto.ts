import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly questionsId: number;

  @IsNumber()
  readonly sectionId: number;

  @IsBoolean()
  readonly isCorrect: boolean;
}
