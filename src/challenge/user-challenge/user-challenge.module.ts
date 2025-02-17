import { Module } from '@nestjs/common';
import { UserChallengeService } from './user-challenge.service';
import { UserChallengeController } from './user-challenge.controller';
import { UserChallengeRepository } from './user-challenge.repository';

@Module({
  controllers: [UserChallengeController],
  providers: [UserChallengeService, UserChallengeRepository],
})
export class UserChallengeModule {}
