import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserInfo } from 'src/users/entities/user.entity';
import { UserChallengesAndInfo } from './user-challenges/user-challenges.interface';

@Injectable()
export class LevelClearChallengesService {
  private readonly challengeType = ChallengeTypeValues.LEVEL_CLEAR;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async completedChallenge(
    user: UserInfo,
  ): Promise<UserChallengesAndInfo | null> {
    const userChallenges =
      await this.userChallengesRepository.findManyByUserAndType(
        user.id,
        this.challengeType,
        user.level,
      );

    const userChallengeIds = userChallenges.map(
      (userChallenge) => userChallenge.id,
    );

    await this.userChallengesRepository.updateManyByIds(userChallengeIds, {
      completed: true,
      completedDate: new Date(),
    });

    const [first, ...order] = userChallenges;

    return first;
  }
}
