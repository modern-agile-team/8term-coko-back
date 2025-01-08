import { ApiProperty } from '@nestjs/swagger';
import { Section } from '../entities/section.entity';

export class ResSectionDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 2 })
  readonly name: string;

  @ApiProperty({ example: 1 })
  readonly order: number;

  constructor(section: Section) {
    this.id = section.id;
    this.name = section.name;
    this.order = section.order;
  }

  static fromArray(sections: Section[]): ResSectionDto[] {
    return sections.map((section) => new ResSectionDto(section));
  }
}
