import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly questionsService: QuizzesService) {}

  @Post()
  create(@Body() quizData: CreateQuizDto) {
    return this.questionsService.create(quizData);
  }

  @Get()
  getAll(@Query() query: QueryQuizDto) {
    return this.questionsService.findAll(query);
  }

  @Get(':id')
  getOneBySectionPartId(@Param('id', PositiveIntPipe) id: number) {
    return this.questionsService.findQuizById(id);
  }

  @Put(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() quizData: UpdateQuizDto,
  ) {
    return this.questionsService.update(id, quizData);
  }

  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.questionsService.remove(id);
  }
}
