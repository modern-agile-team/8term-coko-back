import { ApiProperty } from '@nestjs/swagger';
import { ResPartDto } from 'src/parts/dto/res-part.part.dto';

export class ResSectionDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 2 })
  readonly name: string;

  @ApiProperty({ example: 1 })
  readonly order: number;

  @ApiProperty({ type: [ResPartDto], example: [] })
  readonly part?: ResPartDto[];

  constructor({ id, name, order, part }: ResSectionDto) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.part = part;
  }

  static fromArray(sections: ResSectionDto[]): ResSectionDto[] {
    return sections.map((section) => new ResSectionDto(section));
  }
}
