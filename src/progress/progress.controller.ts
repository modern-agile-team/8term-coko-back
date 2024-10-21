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
import { UpdateProgressDto } from './dto/update-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';

@Controller('users/:userId/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  findAll(
    @Param('userId', PositiveIntPipe) userId: number,
    @Query() query: QueryProgressDto,
  ) {
    return this.progressService.findAll(query);
  }

  @Put(':id')
  update(
    @Param('userId', PositiveIntPipe) userId: number,
    @Param('id', PositiveIntPipe) id: number,
    @Body() progressData: UpdateProgressDto,
  ) {
    return this.progressService.update(userId, progressData);
  }
}
