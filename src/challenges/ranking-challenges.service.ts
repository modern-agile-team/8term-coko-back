import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserChallengesAndInfo } from './user-challenges/user-challenges.interface';
import { RankingPaginationResponseDto } from 'src/ranking/dtos/ranking-pagination-res.dto';
import { nowKST } from 'src/common/function/time.helper';

@Injectable()
export class RankingChallengesService {
  private readonly levelChallengeType =
    ChallengeTypeValues.LEVEL_RANKING_ATTAIN;
  private readonly pointChallengeType =
    ChallengeTypeValues.POINT_RANKING_ATTAIN;
  private readonly attendanceChallengeType =
    ChallengeTypeValues.ATTENDANCE_RANKING_ATTAIN;
  private readonly correctAnswerChallengeType =
    ChallengeTypeValues.CORRECT_ANSWER_RANKING_ATTAIN;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  /**
   * 레벨 랭킹 완료했는지 검사 후 업데이트
   * @param levelTopRankers
   * @returns
   */
  async completedLevelRankingChallenge(
    levelTopRankers: RankingPaginationResponseDto,
  ): Promise<UserChallengesAndInfo[] | null> {
    const topRankers = levelTopRankers.contents;

    // 완료된 도전과제 목록 저장용
    const completedChallenges: UserChallengesAndInfo[] = [];

    for (let i = 0; i < topRankers.length; i++) {
      const ranker = topRankers[i];
      const rank = i + 1;

      // (1) 해당 유저가 조건에 맞는 도전과제 있는지 조회
      const userLevelChallenge =
        await this.userChallengesRepository.findOneRankingByUserAndType(
          ranker.id,
          this.levelChallengeType, // 예: ChallengeTypeValues.LEVEL_RANKING_ATTAIN
          rank,
        );

      // (2) 도전과제가 존재한다면 completed 처리
      if (userLevelChallenge) {
        const updatedChallenge =
          await this.userChallengesRepository.updateRankingChallengeById(
            userLevelChallenge.id,
            {
              completed: true,
              completedDate: nowKST(),
            },
          );

        completedChallenges.push(updatedChallenge);
      }
    }

    // 1, 2, 3 등 모두 업데이트 대상이 아니라면 null 반환
    if (completedChallenges.length === 0) {
      return null;
    }

    return completedChallenges;
  }

  async completedPointRankingChallenge(
    pointTopRankers: RankingPaginationResponseDto,
  ): Promise<UserChallengesAndInfo[] | null> {
    const topRankers = pointTopRankers.contents;

    // 완료된 도전과제 목록 저장용
    const completedChallenges: UserChallengesAndInfo[] = [];

    for (let i = 0; i < topRankers.length; i++) {
      const ranker = topRankers[i];
      const rank = i + 1;

      // (1) 해당 유저가 조건에 맞는 도전과제 있는지 조회
      const userPointChallenge =
        await this.userChallengesRepository.findOneRankingByUserAndType(
          ranker.id,
          this.pointChallengeType, // 예: ChallengeTypeValues.LEVEL_RANKING_ATTAIN
          rank,
        );

      // (2) 도전과제가 존재한다면 completed 처리
      if (userPointChallenge) {
        const updatedChallenge =
          await this.userChallengesRepository.updateRankingChallengeById(
            userPointChallenge.id,
            {
              completed: true,
              completedDate: nowKST(),
            },
          );

        completedChallenges.push(updatedChallenge);
      }
    }

    // 1, 2, 3 등 모두 업데이트 대상이 아니라면 null 반환
    if (completedChallenges.length === 0) {
      return null;
    }

    return completedChallenges;
  }

  async completedAttendanceRankingChallenge(
    attendanceTopRankers: RankingPaginationResponseDto,
  ): Promise<UserChallengesAndInfo[] | null> {
    const topRankers = attendanceTopRankers.contents;

    // 완료된 도전과제 목록 저장용
    const completedChallenges: UserChallengesAndInfo[] = [];

    for (let i = 0; i < topRankers.length; i++) {
      const ranker = topRankers[i];
      const rank = i + 1;

      // (1) 해당 유저가 조건에 맞는 도전과제 있는지 조회
      const userAttendanceChallenge =
        await this.userChallengesRepository.findOneRankingByUserAndType(
          ranker.id,
          this.attendanceChallengeType, // 예: ChallengeTypeValues.LEVEL_RANKING_ATTAIN
          rank,
        );

      // (2) 도전과제가 존재한다면 completed 처리
      if (userAttendanceChallenge) {
        const updatedChallenge =
          await this.userChallengesRepository.updateRankingChallengeById(
            userAttendanceChallenge.id,
            {
              completed: true,
              completedDate: nowKST(),
            },
          );

        completedChallenges.push(updatedChallenge);
      }
    }

    // 1, 2, 3 등 모두 업데이트 대상이 아니라면 null 반환
    if (completedChallenges.length === 0) {
      return null;
    }

    return completedChallenges;
  }

  async completedCorrectAnswerRankingChallenge(
    correctAnswerTopRankers: RankingPaginationResponseDto,
  ): Promise<UserChallengesAndInfo[] | null> {
    const topRankers = correctAnswerTopRankers.contents;

    // 완료된 도전과제 목록 저장용
    const completedChallenges: UserChallengesAndInfo[] = [];

    for (let i = 0; i < topRankers.length; i++) {
      const ranker = topRankers[i];
      const rank = i + 1;

      // (1) 해당 유저가 조건에 맞는 도전과제 있는지 조회
      const userCorrectAnswerChallenge =
        await this.userChallengesRepository.findOneRankingByUserAndType(
          ranker.id,
          this.correctAnswerChallengeType, // 예: ChallengeTypeValues.LEVEL_RANKING_ATTAIN
          rank,
        );

      // (2) 도전과제가 존재한다면 completed 처리
      if (userCorrectAnswerChallenge) {
        const updatedChallenge =
          await this.userChallengesRepository.updateRankingChallengeById(
            userCorrectAnswerChallenge.id,
            {
              completed: true,
              completedDate: nowKST(),
            },
          );

        completedChallenges.push(updatedChallenge);
      }
    }

    // 1, 2, 3 등 모두 업데이트 대상이 아니라면 null 반환
    if (completedChallenges.length === 0) {
      return null;
    }

    return completedChallenges;
  }
}
