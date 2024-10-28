import { IsNumber, IsString } from 'class-validator';

export class CreatePartDto {
  @IsNumber()
  readonly sectionId: number;

  @IsString()
  readonly name: string;
}
