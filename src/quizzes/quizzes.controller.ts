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

  @ApiQuizzes.create()
  @Post()
  create(@Body() quizData: CreateQuizDto) {
    return this.quizzesService.create(quizData);
  }

  @ApiQuizzes.findAll()
  @Get()
  findAll(@Query() query: QueryQuizDto) {
    return this.quizzesService.findAll(query);
  }

  @ApiQuizzes.findOne()
  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.quizzesService.findQuizById(id);
  }

  @ApiQuizzes.update()
  @Put(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() quizData: UpdateQuizDto,
  ) {
    return this.quizzesService.update(id, quizData);
  }

  @ApiQuizzes.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.quizzesService.remove(id);
  }
}
