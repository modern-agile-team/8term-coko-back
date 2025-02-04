import { forwardRef, Module } from '@nestjs/common';
import { PartProgressService } from './part-progress.service';
import { PartProgressController } from './part-progress.controller';
import { PartProgressRepository } from './part-progress.repository';
import { PartsModule } from 'src/parts/parts.module';

@Module({
  imports: [forwardRef(() => PartsModule)],
  controllers: [PartProgressController],
  providers: [PartProgressService, PartProgressRepository],
  exports: [PartProgressService, PartProgressRepository],
})
export class PartProgressModule {}
