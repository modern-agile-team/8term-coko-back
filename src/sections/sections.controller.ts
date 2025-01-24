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
import { ResSectionPartsDto } from './dto/res-section-parts.dto';

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

  /**
   * 기존 findOne 다시 복구
   * 추가로 ResSectionPartsDto가 status도 확인하게 바뀌어서 관련된 값이 들어오도록 변경
   * -> :Promise<ResSectionPartsDto>
   */
  @ApiSections.findOneWithStatus()
  @Get(':id')
  async findOneWithStatus(
    @Param('id', PositiveIntPipe) id: number,
  ): Promise<ResSectionPartsDto> {
    const sectionWithParts = await this.sectionsService.findOneWithParts(id);
    return new ResSectionPartsDto(sectionWithParts);
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
