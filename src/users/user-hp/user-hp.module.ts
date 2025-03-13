import { Module } from '@nestjs/common';
import { UserHpController } from './user-hp.controller';
import { UserHpService } from './user-hp.service';
import { UserHpRepository } from './user-hp.repository';
import { SseModule } from 'src/sse/sse.module';
import { HpEventsListener } from './user-hp.event';

@Module({
  imports: [SseModule],
  controllers: [UserHpController],
  providers: [UserHpService, UserHpRepository, HpEventsListener],
})
export class UserHpModule {}
