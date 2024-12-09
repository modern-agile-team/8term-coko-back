import { ApiProperty } from '@nestjs/swagger';
import { Part } from '../entities/part.entity';

export class ResPartDto {
  @ApiProperty({ example: 4 })
  readonly id: number;

  @ApiProperty({ example: 2 })
  readonly sectionId: number;

  @ApiProperty({ example: 'const' })
  readonly name: string;

  constructor({ id, sectionId, name }: Part) {
    this.id = id;
    this.sectionId = sectionId;
    this.name = name;
  }

  static fromArray(parts: Part[]): ResPartDto[] {
    return parts.map((part) => new ResPartDto(part));
  }
}
