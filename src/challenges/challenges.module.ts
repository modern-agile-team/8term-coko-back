import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesModule } from './user-challenges/user-challenges.module';
import { UsersCoreModule } from 'src/users/users-core.module';
import { SectionsChallengesService } from './section-clear-challenges.service';
import { ChallengesEventsListener } from './events/challenges.event';
import { SectionsModule } from 'src/sections/sections.module';
import { SseModule } from 'src/sse/sse.module';
import { LevelClearChallengesService } from './level-clear-challenges.service';
import { AttendanceStreakChallengesService } from './attendance-streak-challenges.service';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { RankingChallengesService } from './ranking-challenges.service';
import { FirstItemBuyChallengesService } from './first-item-buy.challenges.service';
import { FirstWrongAnswerChallengesService } from './first-wrong-answer.challenges.service';

@Module({
  imports: [
    UserChallengesModule,
    UsersCoreModule,
    SectionsModule,
    AttendanceModule,
    SseModule,
  ],
  controllers: [ChallengesController],
  providers: [
    ChallengesService,
    ChallengesRepository,
    SectionsChallengesService,
    FirstItemBuyChallengesService,
    LevelClearChallengesService,
    AttendanceStreakChallengesService,
    RankingChallengesService,
    FirstWrongAnswerChallengesService,

    ChallengesEventsListener,
  ],
})
export class ChallengesModule {}
