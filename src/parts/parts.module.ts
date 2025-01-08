import { forwardRef, Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartsRepository } from './parts.repository';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { SectionsModule } from 'src/sections/sections.module';
import { PartProgressModule } from 'src/part-progress/part-progress.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => SectionsModule),
    QuizzesModule,
    PartProgressModule,
    AuthModule,
  ],
  controllers: [PartsController],
  providers: [PartsService, PartsRepository],
  exports: [PartsService, PartsRepository, QuizzesModule, PartProgressModule],
})
export class PartsModule {}
