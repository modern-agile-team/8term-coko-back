import { forwardRef, Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartsRepository } from './parts.repository';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { SectionsModule } from 'src/sections/sections.module';

@Module({
  imports: [QuizzesModule, forwardRef(() => SectionsModule)],
  controllers: [PartsController],
  providers: [PartsService, PartsRepository],
  exports: [PartsService, PartsRepository, QuizzesModule],
})
export class PartsModule {}
