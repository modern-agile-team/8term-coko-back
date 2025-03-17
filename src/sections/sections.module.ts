import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsRepository } from './sections.repository';
import { PartsModule } from 'src/parts/parts.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { SectionsController } from './sections.controller';
import { UsersSectionsController } from './users-sections.controller';

@Module({
  imports: [PartsModule, PaginationModule],
  controllers: [SectionsController, UsersSectionsController],
  providers: [SectionsService, SectionsRepository],
  exports: [SectionsService, SectionsRepository, PartsModule],
})
export class SectionsModule {}
