import { Module } from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { DailyQuestsController } from './daily-quests.controller';

@Module({
  controllers: [DailyQuestsController],
  providers: [DailyQuestsService],
})
export class DailyQuestsModule {}
