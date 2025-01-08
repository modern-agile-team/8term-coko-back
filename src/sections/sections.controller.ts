import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiSections } from './sections.swagger';
import { ResSectionDto } from './dto/res-section.dto';
import { UpdateSectionOrderDto } from './dto/update-section-order.dto';

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

  @ApiSections.findOne()
  @Get(':sectionId')
  async findOne(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
  ): Promise<ResSectionDto> {
    const sectionWithParts =
      await this.sectionsService.findOneWithParts(sectionId);
    return new ResSectionDto(sectionWithParts);
  }

  @ApiSections.findOneWithStatus()
  @Get(':sectionId/users/:userId/part-status')
  async findOneWithStatus(
    @Param('userId', PositiveIntPipe) userId: number,
    @Param('sectionId', PositiveIntPipe) sectionId: number,
  ) {
    const sectionWithParts =
      await this.sectionsService.findOneWithPartsAndStatus(userId, sectionId);
    return new ResSectionDto(sectionWithParts);
  }

  @ApiSections.create()
  @Post()
  @HttpCode(204)
  async create(@Body() body: CreateSectionDto): Promise<void> {
    await this.sectionsService.create(body);
  }

  @ApiSections.updateAll()
  @Patch(':sectionId')
  @HttpCode(204)
  async updateAll(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
    @Body() body: CreateSectionDto,
  ): Promise<void> {
    await this.sectionsService.updateAll(sectionId, body);
  }

  @ApiSections.updateOrder()
  @Patch(':sectionId/order')
  @HttpCode(204)
  async updateOrder(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
    @Body() body: UpdateSectionOrderDto,
  ): Promise<void> {
    await this.sectionsService.updateOrder(sectionId, body);
  }

  @ApiSections.remove()
  @Delete(':sectionId')
  @HttpCode(204)
  async remove(
    @Param('sectionId', PositiveIntPipe) sectionId: number,
  ): Promise<void> {
    await this.sectionsService.remove(sectionId);
  }
}
