import { forwardRef, Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesRepository } from './quizzes.repository';
import { ProgressModule } from 'src/progress/progress.module';
import { PartsModule } from 'src/parts/parts.module';
import { SectionsModule } from 'src/sections/sections.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ProgressModule,
    forwardRef(() => SectionsModule),
    forwardRef(() => PartsModule),
    AuthModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
  exports: [QuizzesService, QuizzesRepository, ProgressModule],
})
export class QuizzesModule {}
