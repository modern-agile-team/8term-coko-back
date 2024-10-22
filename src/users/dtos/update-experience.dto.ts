import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @IsNumber()
  readonly experience: number;
}
