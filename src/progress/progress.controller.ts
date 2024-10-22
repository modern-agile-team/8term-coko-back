import { Controller, Get, Body, Param, Query, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
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
    return this.progressService.findAll(userId, query);
  }

  @Put('quizzes/:quizId')
  update(
    @Param('userId', PositiveIntPipe) userId: number,
    @Param('quizId', PositiveIntPipe) quizId: number,
    @Body() progressData: CreateProgressDto,
  ) {
    return this.progressService.createOrUpdate(userId, quizId, progressData);
  }
}
