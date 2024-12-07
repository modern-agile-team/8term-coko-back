import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { PartsModule } from 'src/parts/parts.module';
import { SectionsModule } from 'src/sections/sections.module';
import { ProgressRepository } from './progress.repository';

@Module({
  imports: [QuizzesModule, PartsModule, SectionsModule],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressRepository],
})
export class ProgressModule {}
