import { forwardRef, Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { ProgressRepository } from './progress.repository';
import { SectionsModule } from 'src/sections/sections.module';
import { PartsModule } from 'src/parts/parts.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [
    forwardRef(() => SectionsModule),
    forwardRef(() => PartsModule),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressRepository],
  exports: [ProgressService, ProgressRepository],
})
export class ProgressModule {}
