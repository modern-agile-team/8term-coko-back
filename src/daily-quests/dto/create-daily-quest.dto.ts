import { IsInt, IsString, Min } from 'class-validator';

export class CreateDailyQuestDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsInt()
  @Min(0)
  readonly point: number;

  @IsInt()
  @Min(0)
  readonly exp: number;

  @IsInt()
  @Min(0)
  readonly condition: number;
}
