import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsRepository } from './rankings.repository';
import { RankingsService } from './rankings.service';
import { UsersModule } from 'src/users/modules/users.module';

@Module({
  imports: [UsersModule],
  controllers: [RankingsController],
  providers: [RankingsService, RankingsRepository],
})
export class RankingsModule {}
