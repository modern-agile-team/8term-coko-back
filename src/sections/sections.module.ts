import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SectionsRepository } from './sections.repository';
import { PartsModule } from 'src/parts/parts.module';

@Module({
  imports: [PartsModule],
  controllers: [SectionsController],
  providers: [SectionsService, SectionsRepository],
  exports: [SectionsService, SectionsRepository, PartsModule],
})
export class SectionsModule {}
