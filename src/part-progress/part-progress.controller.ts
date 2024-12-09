import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { UpdatePartProgressDto } from './dto/update-part-progress.dto';

@Controller('part-progress')
export class PartProgressController {
  constructor(private readonly partProgressService: PartProgressService) {}

  @Post()
  create(@Body() createPartProgressDto: CreatePartProgressDto) {
    return this.partProgressService.create(createPartProgressDto);
  }

  @Get()
  findAll() {
    return this.partProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartProgressDto: UpdatePartProgressDto) {
    return this.partProgressService.update(+id, updatePartProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partProgressService.remove(+id);
  }
}
