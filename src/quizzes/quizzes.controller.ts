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
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiQuizzes } from './quizzes.swagger';
import { ResQuizDto } from './dto/res-quiz.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiQuizzes.getQuizzes()
  @Get()
  async getQuizzes(@Query() query: QueryQuizDto): Promise<ResQuizDto[]> {
    const quizzes = await this.quizzesService.findAll(query);
    return ResQuizDto.fromArray(quizzes);
  }

  @ApiQuizzes.getQuiz()
  @Get(':quizId')
  async getQuiz(
    @Param('quizId', PositiveIntPipe) quizId: number,
  ): Promise<ResQuizDto> {
    const quiz = await this.quizzesService.findOne(quizId);
    return new ResQuizDto(quiz);
  }

  @ApiQuizzes.createQuiz()
  @Post()
  @HttpCode(204)
  //@UseGuards(AuthGuard('adminAccessToken'))
  async createQuiz(@Body() body: CreateQuizDto): Promise<void> {
    await this.quizzesService.create(body);
  }

  @ApiQuizzes.updateQuiz()
  @Put(':quizId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async updateQuiz(
    @Param('quizId', PositiveIntPipe) quizId: number,
    @Body() body: UpdateQuizDto,
  ): Promise<void> {
    await this.quizzesService.update(quizId, body);
  }

  @ApiQuizzes.deleteQuiz()
  @Delete(':quizId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async deleteQuiz(
    @Param('quizId', PositiveIntPipe) quizId: number,
  ): Promise<void> {
    await this.quizzesService.remove(quizId);
  }
}
