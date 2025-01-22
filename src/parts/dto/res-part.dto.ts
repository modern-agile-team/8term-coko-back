import { ApiProperty } from '@nestjs/swagger';
import { Part } from '../entities/part.entity';

export class ResPartDto {
  @ApiProperty({ example: 4 })
  readonly id: number;

  @ApiProperty({ example: 2 })
  readonly sectionId: number;

  @ApiProperty({ example: 'const' })
  readonly name: string;

  @ApiProperty({ example: 1 })
  readonly order: number;

  constructor({ id, sectionId, name, order }: Part) {
    this.id = id;
    this.sectionId = sectionId;
    this.name = name;
    this.order = order;
  }

  static fromArray(parts: Part[]): ResPartDto[] {
    return parts.map((part) => new ResPartDto(part));
  }
}
