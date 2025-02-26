import { Injectable } from '@nestjs/common';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserChallengesAndInfo } from './user-challenges/user-challenges.interface';
import { AttendanceRepository } from 'src/attendance/attendance.repository';

@Injectable()
export class AttendanceStreakChallengesService {
  private readonly challengeType = ChallengeTypeValues.ATTENDANCE_STREAK;

  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
    private readonly attedanceRepository: AttendanceRepository,
  ) {}

  async completedChallenge(
    userId: number,
  ): Promise<UserChallengesAndInfo | null> {
    // 조건인자인 2번째 인자보다 낮으면서, complete되지 않은 도전과제를 가져옴

    const userChallenges =
      await this.userChallengesRepository.findManyByUserAndType(
        userId,
        this.challengeType,
      );

    // 모든 도전과제가 complete 라면
    if (userChallenges.length === 0) {
      return null;
    }

    const now = new Date();
    const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC → KST 변환
    // 현재 날짜
    let currentDate = new Date(
      Date.UTC(
        nowKST.getUTCFullYear(),
        nowKST.getUTCMonth(),
        nowKST.getUTCDate(),
        0,
        0,
        0,
      ),
    );

    let streak = 0;

    // 최대 30일 동안 검사
    for (let i = 0; i < 30; i++) {
      // DB에서 userId와 currentDate에 해당하는 출석 기록을 조회
      const attendance = await this.attedanceRepository.findAttendanceRecord(
        userId,
        currentDate,
      );

      if (attendance) {
        // 출석 기록이 있다면 streak 증가 후, 하루 전으로 이동
        streak++;
        // 하루 전 날짜로 변경 (24시간 = 86,400,000 밀리초)
        currentDate = new Date(currentDate.getTime() - 86400000);
      } else {
        // 출석 기록이 없으면 연속 출석이 끊긴 것으로 간주하고 종료
        break;
      }
    }

    // 업데이트 할 유저의 도전과제 조회
    const userChallengesForUpdate =
      await this.userChallengesRepository.findManyByUserAndType(
        userId,
        this.challengeType,
        streak,
      );

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
