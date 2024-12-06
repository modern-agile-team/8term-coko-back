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
import { ApiTags } from '@nestjs/swagger';
import { ApiQuizzes } from './quizzes.swagger';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiQuizzes.findAll()
  @Get()
  findAll(@Query() query: QueryQuizDto) {
    return this.quizzesService.findAll(query);
  }

  @ApiQuizzes.findOne()
  @Get(':id')
  getQuiz(@Param('id', PositiveIntPipe) id: number) {
    return this.quizzesService.getQuiz(id);
  }

  @ApiQuizzes.findAllProgressIncorrect()
  @Get('users/:id/incorrect')
  getQuizsProgressIncorrect(
    @Param('id', PositiveIntPipe) userId: number,
    @Query() query: QueryQuizDto,
  ) {
    return this.quizzesService.findAllProgressIncorrect(userId, query);
  }

  @ApiQuizzes.create()
  @Post()
  create(@Body() body: CreateQuizDto) {
    return this.quizzesService.create(body);
  }

  @ApiQuizzes.update()
  @Put(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: UpdateQuizDto,
  ) {
    return this.quizzesService.update(id, body);
  }

  @ApiQuizzes.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.quizzesService.remove(id);
  }
}
