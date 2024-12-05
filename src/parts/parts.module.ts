import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { PartsRepository } from './parts.repository';
import { SectionsRepository } from 'src/sections/sections.repository';

@Module({
  imports: [SectionsRepository],
  controllers: [PartsController],
  providers: [PartsService, PartsRepository],
  exports: [PartsRepository],
})
export class PartsModule {}
