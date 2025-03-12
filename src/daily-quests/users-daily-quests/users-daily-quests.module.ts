import { forwardRef, Module } from '@nestjs/common';
import { UsersDailyQuestsService } from './users-daily-quests.service';
import { UsersDailyQuestsController } from './users-daily-quests.controller';
import { UsersDailyQuestsRepository } from './users-daily-quests.repository';
import { DailyQuestsModule } from '../daily-quests.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProgressModule } from 'src/progress/progress.module';
import { UsersCoreModule } from 'src/users/modules/users-core.module';
import { UsersDailyQuestsEventsListener } from './events/users-daily-quests.event';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [
    forwardRef(() => DailyQuestsModule),
    ScheduleModule.forRoot(),
    ProgressModule,
    UsersCoreModule,
    SseModule,
  ],
  controllers: [UsersDailyQuestsController],
  providers: [
    UsersDailyQuestsService,
    UsersDailyQuestsRepository,
    UsersDailyQuestsEventsListener,
  ],
})
export class UsersDailyQuestsModule {}
