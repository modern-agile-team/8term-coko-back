import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesRepository } from './quizzes.repository';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
})
export class QuizzesModule {}
