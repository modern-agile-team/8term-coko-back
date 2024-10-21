import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  readonly sectionId: number;

  @IsBoolean()
  readonly isCorrect: boolean;
}
