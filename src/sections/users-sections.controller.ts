import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSections } from './sections.swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { QuerySectionDto } from './dto/query-section.dto';
import { ResPaginationOfSectionPartsDto } from './dto/res-pagination-of-section-parts.dto';

@ApiTags('sections')
@Controller('users/sections')
export class UsersSectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiSections.findAllPaginatedSectionsPartsWithStatus()
  @Get('/parts')
  @UseGuards(AuthGuard('accessToken'))
  async findAllPaginatedSectionsPartsWithStatus(
    @User() user: any,
    @Query() query: QuerySectionDto,
  ) {
    const sectionWithPartsStatus =
      await this.sectionsService.findAllWithPartsAndStatus(user.id, query);
    return new ResPaginationOfSectionPartsDto(sectionWithPartsStatus);
  }
}
