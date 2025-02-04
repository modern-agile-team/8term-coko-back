import { Module } from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { DailyQuestsController } from './daily-quests.controller';
import { DailyQuestsRepository } from './daily-quests.repository';

@Module({
  controllers: [DailyQuestsController],
  providers: [DailyQuestsService, DailyQuestsRepository],
})
export class DailyQuestsModule {}
