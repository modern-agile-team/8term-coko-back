import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesRepository } from './quizzes.repository';
import { SectionsModule } from 'src/sections/sections.module';
import { PartsModule } from 'src/parts/parts.module';

@Module({
  imports: [SectionsModule, PartsModule],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
  exports: [QuizzesService, QuizzesRepository],
})
export class QuizzesModule {}
