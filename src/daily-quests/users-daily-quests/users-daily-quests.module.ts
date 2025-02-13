import { forwardRef, Module } from '@nestjs/common';
import { UsersDailyQuestsService } from './users-daily-quests.service';
import { UsersDailyQuestsController } from './users-daily-quests.controller';
import { UsersDailyQuestsRepository } from './users-daily-quests.repository';
import { DailyQuestsModule } from '../daily-quests.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [
    forwardRef(() => DailyQuestsModule),
    ScheduleModule.forRoot(),
    ProgressModule,
  ],
  controllers: [UsersDailyQuestsController],
  providers: [UsersDailyQuestsService, UsersDailyQuestsRepository],
})
export class UsersDailyQuestsModule {}
