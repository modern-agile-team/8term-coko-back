import { IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  readonly name: string;
}
