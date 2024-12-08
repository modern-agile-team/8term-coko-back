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
import { ResSectionWithPartDto } from './dto/res-section-with-part.dto';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiSections.findAll()
  @Get()
  async findAll() {
    return this.sectionsService.findAll();
  }

  @ApiSections.findOne()
  @Get(':id')
  async findOne(@Param('id', PositiveIntPipe) id: number) {
    const sectionWithParts = await this.sectionsService.findOne(id);
    return new ResSectionWithPartDto(sectionWithParts);
  }

  @ApiSections.create()
  @Post()
  @HttpCode(204)
  async create(@Body() body: CreateSectionDto): Promise<void> {
    await this.sectionsService.create(body);
  }

  @ApiSections.update()
  @Patch(':id')
  @HttpCode(204)
  async update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: CreateSectionDto,
  ): Promise<void> {
    await this.sectionsService.update(sectionDto);
  }

  @ApiSections.remove()
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', PositiveIntPipe) id: number): Promise<void> {
    await this.sectionsService.remove(sectionDto);
  }
}
