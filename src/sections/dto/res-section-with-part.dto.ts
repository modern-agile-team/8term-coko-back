import { Part } from '@prisma/client';

export class ResSectionWithPartDto {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly part?: Part[];

  constructor({ id, name, createdAt, updatedAt, part }: ResSectionWithPartDto) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.part = part;
  }

  static fromArray(sections: ResSectionWithPartDto[]): ResSectionWithPartDto[] {
    return sections.map((section) => new ResSectionWithPartDto(section));
  }
}
