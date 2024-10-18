import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';

@Controller('users/:userId/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: QueryProgressDto,
  ) {
    return this.progressService.findAll(query);
  }

  @Put(':id')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() progressData: UpdateProgressDto,
  ) {
    return this.progressService.update(userId, progressData);
  }
}
