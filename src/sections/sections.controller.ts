import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiSections } from './sections.swagger';
import { Section } from '@prisma/client';
import { SectionDto } from './dto/section.dto';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiSections.create()
  @Post()
  create(@Body() body: CreateSectionDto) {
    return this.sectionsService.create(body);
  }

  @ApiSections.findAll()
  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @ApiSections.findOne()
  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number) {
    const sectionDto = new SectionDto(id);
    return this.sectionsService.findOne(sectionDto);
  }

  @ApiSections.update()
  @Patch(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: UpdateSectionDto,
  ) {
    const sectionDto = new SectionDto(id, body);
    return this.sectionsService.update(sectionDto);
  }

  @ApiSections.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    const sectionDto = new SectionDto(id);
    return this.sectionsService.remove(sectionDto);
  }
}
