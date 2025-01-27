import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QueryQuizDto } from './dto/query-quiz.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiQuizzes } from './quizzes.swagger';
import { ResQuizDto } from './dto/res-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';

@ApiTags('quizzes')
@Controller('users/me/quizzes')
export class UsersQuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiQuizzes.getQuizzesProgressIncorrect()
  @Get('incorrect')
  @UseGuards(AuthGuard('accessToken'))
  async getQuizzesProgressIncorrect(
    @User() user: UserInfo,
    @Query() query: QueryQuizDto,
  ): Promise<ResQuizDto[]> {
    const quizzes = await this.quizzesService.findAllProgressIncorrect(
      user.id,
      query,
    );
    return ResQuizDto.fromArray(quizzes);
  }
}
