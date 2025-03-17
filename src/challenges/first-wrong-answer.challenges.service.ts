import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';

@Injectable()
export class FirstWrongAnswerChallengesService {
  private readonly challengeType = ChallengeTypeValues.FIRST_WRONG_ANSWER;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async completedChallenge(userId: number) {
    const userChallengesForUpdate =
      await this.userChallengesRepository.findManyByUserAndType(
        userId,
        this.challengeType,
      );

    if (userChallengesForUpdate.length === 0) {
      return null;
    }

    const userChallengeIds = userChallengesForUpdate.map(
      (userChallenge) => userChallenge.id,
    );

    // 위에서 가져온 도전과제들을 complete로 변경
    await this.userChallengesRepository.updateManyByIds(userChallengeIds, {
      completed: true,
      completedDate: new Date(),
    });

    const [first, ...order] = userChallengesForUpdate;

    return first;
  }
}
