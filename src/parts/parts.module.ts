import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartsRepository } from './parts.repository';
import { SectionsModule } from 'src/sections/sections.module';

@Module({
  imports: [SectionsModule],
  controllers: [PartsController],
  providers: [PartsService, PartsRepository],
  exports: [PartsRepository],
})
export class PartsModule {}
