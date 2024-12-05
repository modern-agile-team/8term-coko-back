import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesRepository } from './quizzes.repository';
import { SectionsRepository } from 'src/sections/sections.repository';
import { PartsRepository } from 'src/parts/parts.repository';

@Module({
  imports: [SectionsRepository, PartsRepository],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
  exports: [QuizzesRepository],
})
export class QuizzesModule {}
