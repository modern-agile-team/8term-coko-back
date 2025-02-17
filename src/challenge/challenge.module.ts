import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { ChallengeRepository } from './challenge.repository';
import { UserChallengeModule } from './user-challenge/user-challenge.module';

@Module({
  imports: [UserChallengeModule],
  controllers: [ChallengeController],
  providers: [ChallengeService, ChallengeRepository],
})
export class ChallengeModule {}
