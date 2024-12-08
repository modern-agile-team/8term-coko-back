import { Part } from '@prisma/client';

export class ResSectionDto {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly part?: Part[];

  constructor({ id, name, createdAt, updatedAt, part }: ResSectionDto) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.part = part;
  }

  static fromArray(sections: ResSectionDto[]): ResSectionDto[] {
    return sections.map((section) => new ResSectionDto(section));
  }
}
