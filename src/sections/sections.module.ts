import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { SectionsRepository } from './sections.repository';
import { PartsModule } from 'src/parts/parts.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PartsModule, AuthModule],
  controllers: [SectionsController],
  providers: [SectionsService, SectionsRepository],
  exports: [SectionsService, SectionsRepository, PartsModule],
})
export class SectionsModule {}
