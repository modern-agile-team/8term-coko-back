import { Part } from '@prisma/client';

export class ResSectionWithPartDto {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly part: Part[];

  constructor(SectionWithPart: ResSectionWithPartDto) {
    this.id = SectionWithPart.id;
    this.name = SectionWithPart.name;
    this.createdAt = SectionWithPart.createdAt;
    this.updatedAt = SectionWithPart.updatedAt;
    this.part = SectionWithPart.part;
  }

  static from(section: ResSectionWithPartDto): ResSectionWithPartDto {
    return new ResSectionWithPartDto(section);
  }

  static fromArray(sections: ResSectionWithPartDto[]): ResSectionWithPartDto[] {
    return sections.map((section) => new ResSectionWithPartDto(section));
  }
}
