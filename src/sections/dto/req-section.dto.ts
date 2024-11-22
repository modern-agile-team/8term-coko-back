import { UpdateSectionDto } from './update-section.dto';
import { CreateSectionDto } from './create-section.dto';

export class ReqSectionDto {
  readonly id: number;
  readonly name: string;

  constructor(id: number, body?: CreateSectionDto | UpdateSectionDto) {
    this.id = id;
    this.name = body?.name;
  }

  static from(id: number, body?: CreateSectionDto | UpdateSectionDto) {
    return new ReqSectionDto(id, body);
  }
}
