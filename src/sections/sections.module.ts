import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SectionsRepository } from './sections.repository';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, SectionsRepository],
})
export class SectionsModule {}
