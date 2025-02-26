import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesModule } from './user-challenges/user-challenges.module';
import { UsersCoreModule } from 'src/users/modules/users-core.module';
import { SectionsChallengesService } from './section-clear-challenges.service';
import { ChallengesEventsListener } from './events/challenges.event';
import { SectionsModule } from 'src/sections/sections.module';
import { SseModule } from 'src/sse/sse.module';
import { LevelClearChallengesService } from './level-clear-challenges.service';

@Module({
  imports: [UserChallengesModule, UsersCoreModule, SectionsModule, SseModule],
  controllers: [ChallengesController],
  providers: [
    ChallengesService,
    ChallengesRepository,
    SectionsChallengesService,
    LevelClearChallengesService,

    ChallengesEventsListener,
  ],
})
export class ChallengesModule {}
