import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsRepository } from './rankings.repository';
import { RankingsService } from './rankings.service';
import { UsersCoreModule } from 'src/users/users-core.module';
import { UsersRankingsController } from './user-rankings.controller';
import { ProgressModule } from 'src/progress/progress.module';
import { RankingEventsListener } from './rankings.event';
import { UserItemsModule } from 'src/users/user-items/user-items.module';

@Module({
  imports: [UsersCoreModule, ProgressModule, UserItemsModule],
  controllers: [RankingsController, UsersRankingsController],
  providers: [RankingsService, RankingsRepository, RankingEventsListener],
})
export class RankingsModule {}
