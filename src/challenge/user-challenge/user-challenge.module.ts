import { Module } from '@nestjs/common';
import { UserChallengeService } from './user-challenge.service';
import { UserChallengeController } from './user-challenge.controller';

@Module({
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule {}
