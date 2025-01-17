import { PaginatedResult } from 'src/pagination/pagination.interface';
import { ResSectionPartsDto } from './res-section-parts.dto';
import { SectionParts } from 'src/common/type/type';
import { ApiProperty } from '@nestjs/swagger';

export class ResPaginationOfSectionPartsDto
  implements PaginatedResult<ResSectionPartsDto>
{
  @ApiProperty({ type: [ResSectionPartsDto] })
  readonly data: ResSectionPartsDto[];

  @ApiProperty({ type: 'number', nullable: true })
  readonly nextCursor: number | null;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(paginatedResult: PaginatedResult<SectionParts>) {
    this.data = ResSectionPartsDto.fromArray(paginatedResult.data);
    this.nextCursor = paginatedResult.nextCursor;
    this.hasNextPage = paginatedResult.hasNextPage;
  }
}
