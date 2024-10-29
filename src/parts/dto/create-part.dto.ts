import { IsInt, IsString, Min } from 'class-validator';

export class CreatePartDto {
  @IsInt()
  @Min(0)
  readonly sectionId: number;

  @IsString()
  readonly name: string;
}
