import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SectionsRepository } from './sections.repository';
import { PartsModule } from 'src/parts/parts.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [PartsModule, PaginationModule],
  controllers: [SectionsController],
  providers: [SectionsService, SectionsRepository],
  exports: [SectionsService, SectionsRepository, PartsModule],
})
export class SectionsModule {}
