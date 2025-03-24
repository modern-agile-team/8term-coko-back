import { forwardRef, Module } from '@nestjs/common';
import { UsersDailyQuestsService } from './users-daily-quests.service';
import { UsersDailyQuestsController } from './users-daily-quests.controller';
import { UsersDailyQuestsRepository } from './users-daily-quests.repository';
import { DailyQuestsModule } from '../daily-quests.module';
import { ProgressModule } from 'src/progress/progress.module';

import { UsersDailyQuestsEventsListener } from './events/users-daily-quests.event';
import { SseModule } from 'src/sse/sse.module';
import { UsersCoreModule } from 'src/users/users-core.module';

@Module({
  imports: [
    forwardRef(() => DailyQuestsModule),
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
