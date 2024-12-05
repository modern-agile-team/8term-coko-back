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
import { ReqQuizDto } from './dto/req-quiz.dto';

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
  findOne(@Param('id', PositiveIntPipe) id: number) {
    const quizDto = new ReqQuizDto(id);
    return this.quizzesService.findQuizById(quizDto);
  }

  @ApiQuizzes.findAllProgressIncorrect()
  @Get('users/:id/incorrect')
  findAllProgressIncorrect(
    @Param('id', PositiveIntPipe) userId: number,
    @Query() query: QueryQuizDto,
  ) {
    return this.quizzesService.findAllProgressIncorrect(userId, query);
  }

  @ApiQuizzes.create()
  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @ApiQuizzes.update()
  @Put(':id')
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    const quizDto = new ReqQuizDto(id, updateQuizDto);
    return this.quizzesService.update(quizDto);
  }

  @ApiQuizzes.remove()
  @Delete(':id')
  remove(@Param('id', PositiveIntPipe) id: number) {
    const quizDto = new ReqQuizDto(id);
    return this.quizzesService.remove(quizDto);
  }
}
