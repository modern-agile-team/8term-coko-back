import { Module } from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { DailyQuestsController } from './daily-quests.controller';
import { DailyQuestsRepository } from './daily-quests.repository';
import { UsersDailyQuestsModule } from './users-daily-quests/users-daily-quests.module';

@Module({
  imports: [UsersDailyQuestsModule],
  controllers: [DailyQuestsController],
  providers: [DailyQuestsService, DailyQuestsRepository],
  exports: [DailyQuestsRepository],
})
export class DailyQuestsModule {}
