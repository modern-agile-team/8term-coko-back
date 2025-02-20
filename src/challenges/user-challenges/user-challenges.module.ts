import { Module } from '@nestjs/common';
import { UserChallengesService } from './user-challenges.service';
import { UserChallengesController } from './user-challenges.controller';
import { UserChallengesRepository } from './user-challenges.repository';

@Module({
  controllers: [UserChallengesController],
  providers: [UserChallengesService, UserChallengesRepository],
  exports: [UserChallengesRepository],
})
export class UserChallengesModule {}
