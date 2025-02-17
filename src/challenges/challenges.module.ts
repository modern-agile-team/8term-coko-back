import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesModule } from './user-challenges/user-challenges.module';
import { UsersModule } from 'src/users/modules/users.module';

@Module({
  imports: [UserChallengesModule, UsersModule],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository],
})
export class ChallengesModule {}
