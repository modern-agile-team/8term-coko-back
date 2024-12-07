import { Controller, Get, Body, Param, Query, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiProgress } from './progress.swagger';

@ApiTags('progress')
@Controller('users/:id/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @ApiProgress.findAll()
  @Get()
  findAll(
    @Param('id', PositiveIntPipe) userId: number,
    @Query() query: QueryProgressDto,
  ) {
    return this.progressService.findAll(userId, query);
  }

  @ApiProgress.createOrUpdate()
  @Put('quizzes/:quizId')
  createOrUpdate(
    @Param('id', PositiveIntPipe) userId: number,
    @Param('quizId', PositiveIntPipe) quizId: number,
    @Body() body: CreateProgressDto,
  ) {
    return this.progressService.createOrUpdate(userId, quizId, body);
  }
}
