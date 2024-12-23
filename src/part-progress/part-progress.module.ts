import { forwardRef, Module } from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { PartProgressController } from './part-progress.controller';
import { PartProgressRepository } from './part-progress.repository';
import { SectionsModule } from 'src/sections/sections.module';
import { PartsModule } from 'src/parts/parts.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [
    forwardRef(() => SectionsModule),
    forwardRef(() => PartsModule),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [PartProgressController],
  providers: [PartProgressService, PartProgressRepository],
})
export class PartProgressModule {}
