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

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiSections.create()
  @Post()
  create(@Body() sectionData: CreateSectionDto) {
    return this.sectionsService.create(sectionData);
  }

  @ApiSections.findAll()
  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @ApiSections.findOne()
  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.sectionsService.findOne(id);
  }

  @ApiSections.update()
  @Patch(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() sectionData: UpdateSectionDto,
  ) {
    return this.sectionsService.update(id, sectionData);
  }

  @ApiSections.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.sectionsService.remove(id);
  }
}
