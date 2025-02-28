import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserChallengesAndInfo } from './user-challenges/user-challenges.interface';
import { AttendanceRepository } from 'src/attendance/attendance.repository';

@Injectable()
export class RankingChallengesService {
  private readonly levelChallengeType =
    ChallengeTypeValues.LEVEL_RANKING_ATTAIN;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
    private readonly attedanceRepository: AttendanceRepository,
  ) {}

  async completedChallenge(
    userId: number,
  ): Promise<UserChallengesAndInfo | null> {
    const userLevelChallenges =
      await this.userChallengesRepository.findManyByUserAndType(
        userId,
        this.levelChallengeType,
      );

    // 모든 도전과제가 complete 라면
    if (userLevelChallenges.length === 0) {
      return null;
    }
  }
}
