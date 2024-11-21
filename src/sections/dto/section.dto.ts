import { IsInt, IsString } from 'class-validator';
import { UpdateSectionDto } from './update-section.dto';
import { CreateSectionDto } from './create-section.dto';

export class SectionDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly name: string;

  constructor(id: number, body?: CreateSectionDto | UpdateSectionDto) {
    this.id = id;
    this.name = body?.name;
  }
}
