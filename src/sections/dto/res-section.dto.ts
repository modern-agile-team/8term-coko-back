import { Section } from '@prisma/client';

export class ResSectionDto {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(section: ResSectionDto) {
    this.id = section.id;
    this.name = section.name;
    this.createdAt = section.createdAt;
    this.updatedAt = section.updatedAt;
  }

  static from(section: Section) {
    return new ResSectionDto(section);
  }

  static fromArray(sections: Section[]) {
    return sections.map((section) => new ResSectionDto(section));
  }
}
