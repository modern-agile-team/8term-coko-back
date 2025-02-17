import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { ChallengeRepository } from './challenge.repository';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService, ChallengeRepository],
})
export class ChallengeModule {}
