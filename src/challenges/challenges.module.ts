import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesModule } from './user-challenges/user-challenges.module';
import { UsersCoreModule } from 'src/users/modules/users-core.module';

@Module({
  imports: [UserChallengesModule, UsersCoreModule],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository],
})
export class ChallengesModule {}
