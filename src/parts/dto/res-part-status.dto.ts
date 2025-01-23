import { ApiProperty } from '@nestjs/swagger';
import { Part } from '../entities/part.entity';
import { ResPartDto } from './res-part.dto';
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';

export class ResPartStatusDto extends ResPartDto {
  @ApiProperty({ example: PartStatusValues.STARTED })
  readonly status: PartStatus;

  constructor(part: Part & { status: PartStatus }) {
    super(part);
    this.status = part.status;
  }

  static fromArray(
    parts: (Part & { status: PartStatus })[],
  ): ResPartStatusDto[] {
    return parts.map((part) => new ResPartStatusDto(part));
  }
}
