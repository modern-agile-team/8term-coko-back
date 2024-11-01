import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';

@Module({
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartsModule {}
