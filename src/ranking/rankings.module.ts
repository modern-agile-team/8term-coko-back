import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsRepository } from './rankings.repository';
import { RankingsService } from './rankings.service';
import { UsersCoreModule } from 'src/users/modules/users-core.module';
import { UsersRankingsController } from './user-rankings.controller';
import { ProgressModule } from 'src/progress/progress.module';
import { RankingEventsListener } from './rankings.event';

@Module({
  imports: [UsersCoreModule, ProgressModule],
  controllers: [RankingsController, UsersRankingsController],
  providers: [RankingsService, RankingsRepository, RankingEventsListener],
})
export class RankingsModule {}
