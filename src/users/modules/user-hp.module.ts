import { Module } from '@nestjs/common';
import { UserHpController } from '../controllers/user-hp.controller';
import { UserHpService } from '../services/user-hp.service';
import { UserHpRepository } from '../repositories/user-hp.repository';
import { SseModule } from 'src/sse/sse.module';
import { HpEventsListener } from '../events/user-hp.event';

@Module({
  imports: [SseModule],
  controllers: [UserHpController],
  providers: [UserHpService, UserHpRepository, HpEventsListener],
})
export class UserHpModule {}
