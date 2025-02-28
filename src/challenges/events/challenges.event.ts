import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';
import { FirstItemBuyChallengesService } from '../first-item-buy.challenges.service';
import { LevelClearChallengesService } from '../level-clear-challenges.service';
import { UserInfo } from 'src/users/entities/user.entity';
import { EVENT } from '../const/challenges.constant';
import { AttendanceStreakChallengesService } from '../attendance-streak-challenges.service';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
    private readonly levelClearChallengesService: LevelClearChallengesService,
    private readonly attendanceStreakChallengesService: AttendanceStreakChallengesService,
    private readonly firstItemBuyChallengesService: FirstItemBuyChallengesService,
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
   * 유저가 7일 연속 출석 했을때 호출되는 이벤트
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
        `handleLevelChallenge 에러 발생 (userId: ${userId}):`,
        error,
      );
    }
  }

  /**
   * 유저가 아이템을 구매 했을때 호출되는 이벤트
   * @param payload
   */
  @OnEvent(EVENT.ITME.BUY)
  async handleFirstItmeBuyChallenge(payload: { userId: number }) {
    const { userId } = payload;

    const userChallengesAndInfo =
      await this.firstItemBuyChallengesService.completedChallenge(userId);

    if (userChallengesAndInfo) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: 'partStatus.completed',
        message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
