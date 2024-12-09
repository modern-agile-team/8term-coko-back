import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiProgress } from './progress.swagger';
import { ResProgressDto } from './dto/res-progress.dto';

@ApiTags('progress')
@Controller('users/:id/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @ApiProgress.findAll()
  @Get()
  async findAll(
    @Param('id', PositiveIntPipe) userId: number,
    @Query() query: QueryProgressDto,
  ) {
    const progress = await this.progressService.findAll(userId, query);
    return new ResProgressDto(progress);
  }

  @ApiProgress.createOrUpdate()
  @Put('quizzes/:quizId')
  @HttpCode(204)
  async createOrUpdate(
    @Param('id', PositiveIntPipe) userId: number,
    @Param('quizId', PositiveIntPipe) quizId: number,
    @Body() body: CreateProgressDto,
  ) {
    await this.progressService.createOrUpdate(userId, quizId, body);
  }
}
