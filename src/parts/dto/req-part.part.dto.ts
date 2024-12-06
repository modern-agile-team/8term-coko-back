import { CreatePartDto } from './create-part.dto';

export class ReqPartDto {
  readonly id: number;
  readonly sectionId: number;
  readonly name: string;

  constructor(id: number, body?: CreatePartDto) {
    this.id = id;
    this.sectionId = body?.sectionId;
    this.name = body?.name;
  }

  static from(id: number, body?: CreatePartDto) {
    return new ReqPartDto(id, body);
  }
}
