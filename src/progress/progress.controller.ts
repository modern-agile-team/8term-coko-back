import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';

@Controller('users/:id/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Body() progressData: CreateProgressDto) {
    return this.progressService.create(progressData);
  }

  @Get()
  findAll(@Query() query: QueryProgressDto) {
    return this.progressService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() progressData: UpdateProgressDto,
  ) {
    return this.progressService.update(id, progressData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.progressService.remove(id);
  }
}
