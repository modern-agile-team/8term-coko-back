import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiQuizzes } from './quizzes.swagger';
import { ResQuizDto } from './dto/res-quiz.dto';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiQuizzes.getQuizzes()
  @Get()
  async getQuizzes(@Query() query: QueryQuizDto) {
    const quizzes = await this.quizzesService.findAll(query);
    return ResQuizDto.fromArray(quizzes);
  }

  @ApiQuizzes.getQuiz()
  @Get(':id')
  async getQuiz(@Param('id', PositiveIntPipe) id: number) {
    const quiz = await this.quizzesService.getQuiz(id);
    return new ResQuizDto(quiz);
  }

  @ApiQuizzes.getQuizzesProgressIncorrect()
  @Get('users/:id/incorrect')
  async getQuizzesProgressIncorrect(
    @Param('id', PositiveIntPipe) userId: number,
    @Query() query: QueryQuizDto,
  ) {
    const quizzes = await this.quizzesService.findAllProgressIncorrect(
      userId,
      query,
    );
    return ResQuizDto.fromArray(quizzes);
  }

  @ApiQuizzes.createQuiz()
  @Post()
  @HttpCode(204)
  async createQuiz(@Body() body: CreateQuizDto) {
    await this.quizzesService.create(body);
  }

  @ApiQuizzes.updateQuiz()
  @Put(':id')
  @HttpCode(204)
  async updateQuiz(
    @Param('id', PositiveIntPipe) id: number,
    @Body() body: UpdateQuizDto,
  ) {
    await this.quizzesService.update(id, body);
  }

  @ApiQuizzes.deleteQuiz()
  @Delete(':id')
  @HttpCode(204)
  async deleteQuiz(@Param('id', PositiveIntPipe) id: number) {
    await this.quizzesService.remove(id);
  }
}
