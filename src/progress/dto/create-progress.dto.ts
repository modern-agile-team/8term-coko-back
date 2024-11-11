import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsBoolean()
  readonly isCorrect: boolean;
}
