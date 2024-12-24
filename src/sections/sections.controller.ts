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
  @Get(':id')
  async findOne(
    @Param('id', PositiveIntPipe) id: number,
  ): Promise<ResSectionDto> {
    const sectionWithParts = await this.sectionsService.findOneWithParts(id);
    return new ResSectionDto(sectionWithParts);
  }

  @ApiSections.findOneWithStatus()
  @Get(':id/users/:userId/part-status')
  async findOneWithStatus(
    @Param('userId', PositiveIntPipe) userId: number,
    @Param('id', PositiveIntPipe) id: number,
  ) {
    const sectionWithParts =
      await this.sectionsService.findOneWithPartsAndStatus(userId, id);
    return new ResSectionDto(sectionWithParts);
  }

  @ApiSections.create()
  @Post()
  @HttpCode(204)
  async create(@Body() body: CreateSectionDto): Promise<void> {
    await this.sectionsService.create(body);
  }

  @ApiSections.updateAll()
  @Patch(':id')
  @HttpCode(204)
  async updateAll(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: CreateSectionDto,
  ): Promise<void> {
    await this.sectionsService.updateAll(id, body);
  }

  @ApiSections.updateOrder()
  @Patch(':id/order')
  @HttpCode(204)
  async updateOrder(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: UpdateSectionOrderDto,
  ): Promise<void> {
    await this.sectionsService.updateOrder(id, body);
  }

  @ApiSections.remove()
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', PositiveIntPipe) id: number): Promise<void> {
    await this.sectionsService.remove(id);
  }
}
