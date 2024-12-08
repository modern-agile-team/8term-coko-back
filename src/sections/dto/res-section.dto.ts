import { Part } from '@prisma/client';

export class ResSectionDto {
  readonly id: number;
  readonly name: string;
  readonly part?: Part[];

  constructor({ id, name, part }: ResSectionDto) {
    this.id = id;
    this.name = name;
    this.part = part;
  }

  static fromArray(sections: ResSectionDto[]): ResSectionDto[] {
    return sections.map((section) => new ResSectionDto(section));
  }
}
