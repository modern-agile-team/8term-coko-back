import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';
import { FirstItemBuyChallengesService } from '../first-item-buy.challenges.service';
import { LevelClearChallengesService } from '../level-clear-challenges.service';
import { UserInfo } from 'src/users/entities/user.entity';
import { EVENT } from '../const/challenges.constant';
import { AttendanceStreakChallengesService } from '../attendance-streak-challenges.service';
import { RankingChallengesService } from '../ranking-challenges.service';
import { FirstWrongAnswerChallengesService } from '../first-wrong-answer.challenges.service';
import { RankingPaginationResponseDto } from 'src/ranking/dtos/ranking-pagination-res.dto';
import { nowKST } from 'src/common/function/time.helper';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
    private readonly levelClearChallengesService: LevelClearChallengesService,
    private readonly attendanceStreakChallengesService: AttendanceStreakChallengesService,
    private readonly rankingChallengesService: RankingChallengesService,
    private readonly firstItemBuyChallengesService: FirstItemBuyChallengesService,
    private readonly firstWrongAnswerChallengesService: FirstWrongAnswerChallengesService,
  ) {}

  /**
   * partStatus가 completed로 변경될 때 호출되는 이벤트 (섹션 도전과제 처리)
   */
  @OnEvent(EVENT.PART_STATUS.COMPLETED)
  async handleSectionsChallenge(payload: {
    userId: number;
    sectionId: number;
  }) {
    const { userId, sectionId } = payload;
    try {
      const userChallengesAndInfo =
        await this.sectionsChallengesService.checkAndCompleteSectionChallenge(
          userId,
          sectionId,
        );

      if (userChallengesAndInfo) {
        // SSE 메시지 전송
        this.sseService.notifyUser(userId, {
          type: EVENT.PART_STATUS.COMPLETED,
          message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(
        `handleSectionsChallenge 에러 발생 (userId: ${userId}, sectionId: ${sectionId}):`,
        error,
      );
    }
  }

  /**
   * 유저가 레벨 10업 했을 때 호출되는 이벤트 (레벨 도전과제 처리)
   */
  @OnEvent(EVENT.USER.LEVEL_UP)
  async handleLevelChallenge(payload: { user: UserInfo }) {
    const { user } = payload;
    try {
      const userChallengesAndInfo =
        await this.levelClearChallengesService.completedChallenge(user);

      if (userChallengesAndInfo) {
        // SSE 메시지 전송
        this.sseService.notifyUser(user.id, {
          type: EVENT.USER.LEVEL_UP,
          message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(
        `handleLevelChallenge 에러 발생 (userId: ${user.id}):`,
        error,
      );
    }
  }

  /**
   * 유저가 출석 했을 때 호출되는 이벤트
   */
  @OnEvent(EVENT.ATTENDANCE.STREAK)
  async handleAttendanceStreakChallenge(payload: { userId: number }) {
    const { userId } = payload;
    try {
      const userChallengesAndInfo =
        await this.attendanceStreakChallengesService.completedChallenge(userId);

      if (userChallengesAndInfo) {
        // SSE 메시지 전송
        this.sseService.notifyUser(userId, {
          type: EVENT.ATTENDANCE.STREAK,
          message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(
        `handleAttendanceStreakChallenge 에러 발생 (userId: ${userId}):`,
        error,
      );
    }
  }

  /**
   * 주간 시즌 종료될 때 호출되는 레벨 이벤트
   */
  @OnEvent(EVENT.LEVEL_RANKING.ATTAIN)
  async handleLevelRankingChallenge(payload: {
    levelTopRankers: RankingPaginationResponseDto;
  }) {
    const { levelTopRankers } = payload;
    try {
      const userChallengesAndInfos =
        await this.rankingChallengesService.completedLevelRankingChallenge(
          levelTopRankers,
        );

      // 업데이트 한 도전과제가 있다면
      if (userChallengesAndInfos) {
        // userChallengesAndInfos가 배열이므로, 각각의 userId에 대해 SSE 알림 전송
        userChallengesAndInfos.forEach((challengeInfo) => {
          this.sseService.notifyUser(challengeInfo.userId, {
            type: EVENT.LEVEL_RANKING.ATTAIN,
            message: `도전과제 완료 : ${challengeInfo.challenge.content}`,
            timestamp: nowKST(),
          });
        });
      }
    } catch (error) {
      console.error(`handleLevelRankingChallenge 에러 발생`, error);
    }
  }

  /**
   * 주간 시즌 종료될 때 호출되는 포인트 이벤트
   */
  @OnEvent(EVENT.POINT_RANKING.ATTAIN)
  async handlePointRankingChallenge(payload: {
    pointTopRankers: RankingPaginationResponseDto;
  }) {
    const { pointTopRankers } = payload;
    try {
      const userChallengesAndInfos =
        await this.rankingChallengesService.completedPointRankingChallenge(
          pointTopRankers,
        );

      // 업데이트 한 도전과제가 있다면
      if (userChallengesAndInfos) {
        // userChallengesAndInfos가 배열이므로, 각각의 userId에 대해 SSE 알림 전송
        userChallengesAndInfos.forEach((challengeInfo) => {
          this.sseService.notifyUser(challengeInfo.userId, {
            type: EVENT.POINT_RANKING.ATTAIN,
            message: `도전과제 완료 : ${challengeInfo.challenge.content}`,
            timestamp: nowKST(),
          });
        });
      }
    } catch (error) {
      console.error(`handlePointRankingChallenge 에러 발생`, error);
    }
  }

  /**
   * 주간 시즌 종료될 때 호출되는 출석 이벤트
   */
  @OnEvent(EVENT.ATTENDANCE_RANKING.ATTAIN)
  async handleAttendanceRankingChallenge(payload: {
    attendanceTopRankers: RankingPaginationResponseDto;
  }) {
    const { attendanceTopRankers } = payload;
    try {
      const userChallengesAndInfos =
        await this.rankingChallengesService.completedAttendanceRankingChallenge(
          attendanceTopRankers,
        );

      // 업데이트 한 도전과제가 있다면
      if (userChallengesAndInfos) {
        // userChallengesAndInfos가 배열이므로, 각각의 userId에 대해 SSE 알림 전송
        userChallengesAndInfos.forEach((challengeInfo) => {
          this.sseService.notifyUser(challengeInfo.userId, {
            type: EVENT.ATTENDANCE_RANKING.ATTAIN,
            message: `도전과제 완료 : ${challengeInfo.challenge.content}`,
            timestamp: nowKST(),
          });
        });
      }
    } catch (error) {
      console.error(`handleAttendanceRankingChallenge 에러 발생`, error);
    }
  }

  /**
   * 주간 시즌 종료될 때 호출되는 정답수 이벤트
   */
  @OnEvent(EVENT.POINT_RANKING.ATTAIN)
  async handleCorrectAnswerRankingChallenge(payload: {
    porrectAnswerTopRankers: RankingPaginationResponseDto;
  }) {
    const { porrectAnswerTopRankers } = payload;
    try {
      const userChallengesAndInfos =
        await this.rankingChallengesService.completedCorrectAnswerRankingChallenge(
          porrectAnswerTopRankers,
        );

      // 업데이트 한 도전과제가 있다면
      if (userChallengesAndInfos) {
        // userChallengesAndInfos가 배열이므로, 각각의 userId에 대해 SSE 알림 전송
        userChallengesAndInfos.forEach((challengeInfo) => {
          this.sseService.notifyUser(challengeInfo.userId, {
            type: EVENT.CORRECT_ANSWER_RANKING.ATTAIN,
            message: `도전과제 완료 : ${challengeInfo.challenge.content}`,
            timestamp: nowKST(),
          });
        });
      }
    } catch (error) {
      console.error(`handleCorrectAnswerRankingChallenge 에러 발생`, error);
    }
  }

  /**
   * 유저가 아이템을 구매 했을때 호출되는 이벤트
   * @param payload
   */
  @OnEvent(EVENT.ITEM.BUY)
  async handleFirstItemBuyChallenge(payload: { userId: number }) {
    const { userId } = payload;

    const userChallengesAndInfo =
      await this.firstItemBuyChallengesService.completedChallenge(userId);

    if (userChallengesAndInfo) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: EVENT.ITEM.BUY,
        message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * 퀴즈 진행도가 업데이트 되면 호출되는 이벤트
   * @param payload
   */
  @OnEvent(EVENT.QUIZ.INCORRECT)
  async handleFirstWrongAnswerChallenge(payload: { userId: number }) {
    const { userId } = payload;

    const userChallengesAndInfo =
      await this.firstWrongAnswerChallengesService.completedChallenge(userId);

    if (userChallengesAndInfo) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: EVENT.QUIZ.INCORRECT,
        message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
