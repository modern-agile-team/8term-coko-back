import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserChallengesAndInfo } from './user-challenges/user-challenges.interface';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { RankingsRepository } from 'src/ranking/rankings.repository';

@Injectable()
export class RankingChallengesService {
  private readonly challengeType = ChallengeTypeValues.RANKING_ATTAIN;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
    private readonly attedanceRepository: AttendanceRepository,
  ) {}

  async completedChallenge(
    userId: number,
  ): Promise<UserChallengesAndInfo | null> {
    const userChallenges =
      await this.userChallengesRepository.findManyByUserAndType(
        userId,
        this.challengeType,
      );

    // 모든 도전과제가 complete 라면
    if (userChallenges.length === 0) {
      return null;
    }
  }
}
