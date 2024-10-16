import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly questionsId: number;

  @IsNumber()
  readonly sectionId: number;

  @IsString() // enum으로 변경되야함
  readonly part: string;

  @IsBoolean()
  readonly isCorrect: boolean;
}
