import { ApiProperty } from '@nestjs/swagger';
import { ResPartDto } from 'src/parts/dto/res-part.part.dto';
import { ResSectionDto } from './res-section.dto';
import { Section } from '../entities/section.entity';
import { EXAMPLE_PARTS } from 'src/parts/const/example-parts';
import { SectionParts } from 'src/common/type/type';

export class ResSectionPartsDto extends ResSectionDto {
  @ApiProperty({ type: [ResPartDto], example: EXAMPLE_PARTS })
  readonly parts: ResPartDto[];

  constructor(sectionWithParts: SectionParts) {
    super(sectionWithParts);
    this.parts = sectionWithParts.part;
  }

  static fromArray(sectionsWithParts: SectionParts[]): ResSectionPartsDto[] {
    return sectionsWithParts.map(
      (sectionWithParts) => new ResSectionPartsDto(sectionWithParts),
    );
  }
}
