import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiSections } from './sections.swagger';
import { ResSectionDto } from './dto/res-section.dto';
import { UpdateSectionOrderDto } from './dto/update-section-order.dto';
import { QuerySectionDto } from './dto/query-section.dto';
import { ResPaginationOfSectionPartsDto } from './dto/res-pagination-of-section-parts.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiSections.findAll()
  @Get()
  async findAll(): Promise<ResSectionDto[]> {
    const sections = await this.sectionsService.findAll();
    return ResSectionDto.fromArray(sections);
  }

  @ApiSections.findAllPaginatedSectionsWithParts()
  @Get('parts')
  async findAllPaginatedSectionsWithParts(@Query() query: QuerySectionDto) {
    const PaginatedSectionWithParts =
      await this.sectionsService.findAllWithParts(query);
    return new ResPaginationOfSectionPartsDto(PaginatedSectionWithParts);
  }

  @ApiSections.create()
  @Post()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() body: CreateSectionDto): Promise<void> {
    await this.sectionsService.create(body);
  }

  @ApiSections.updateAll()
  @Patch(':sectionId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateAll(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
    @Body() body: CreateSectionDto,
  ): Promise<void> {
    await this.sectionsService.updateAll(sectionId, body);
  }

  @ApiSections.updateOrder()
  @Patch(':sectionId/order')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateOrder(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
    @Body() body: UpdateSectionOrderDto,
  ): Promise<void> {
    await this.sectionsService.updateOrder(sectionId, body);
  }

  @ApiSections.remove()
  @Delete(':sectionId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async remove(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
  ): Promise<void> {
    await this.sectionsService.remove(sectionId);
  }
}
