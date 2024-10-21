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

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() sectionData: CreateSectionDto) {
    return this.sectionsService.create(sectionData);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() sectionData: UpdateSectionDto,
  ) {
    return this.sectionsService.update(id, sectionData);
  }

  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.sectionsService.remove(id);
  }
}
