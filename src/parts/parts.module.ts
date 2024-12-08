import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartsRepository } from './parts.repository';
import { SectionsModule } from 'src/sections/sections.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [SectionsModule, QuizzesModule],
  controllers: [PartsController],
  providers: [PartsService, PartsRepository],
  exports: [PartsService, PartsRepository],
})
export class PartsModule {}
