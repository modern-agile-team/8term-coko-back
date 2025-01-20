import { ApiProperty } from '@nestjs/swagger';
import { ResPartDto } from 'src/parts/dto/res-part.dto';
import { ResSectionDto } from './res-section.dto';
import { EXAMPLE_PARTS } from 'src/parts/const/example-parts';
import { SectionPartsStatus } from 'src/common/type/type';
import { ResPartStatusDto } from 'src/parts/dto/res-part-status.dto';

export class ResSectionPartsDto extends ResSectionDto {
  @ApiProperty({ type: [ResPartStatusDto] })
  readonly parts: ResPartStatusDto[];

  constructor(sectionWithParts: SectionPartsStatus) {
    super(sectionWithParts);
    this.parts = ResPartStatusDto.fromArray(sectionWithParts.part);
  }

  static fromArray(
    sectionsWithParts: SectionPartsStatus[],
  ): ResSectionPartsDto[] {
    return sectionsWithParts.map(
      (sectionWithParts) => new ResSectionPartsDto(sectionWithParts),
    );
  }
}
