import { ApiProperty } from '@nestjs/swagger';
import { ResPartDto } from 'src/parts/dto/res-part.part.dto';
import { Part } from 'src/parts/entities/part.entity';

export class ResSectionDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 2 })
  readonly name: string;

  @ApiProperty({ type: [ResPartDto], example: [] })
  readonly part?: ResPartDto[];

  constructor({ id, name, part }: ResSectionDto) {
    this.id = id;
    this.name = name;
    this.part = part;
  }

  static fromArray(sections: ResSectionDto[]): ResSectionDto[] {
    return sections.map((section) => new ResSectionDto(section));
  }
}
