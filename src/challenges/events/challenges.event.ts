import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';
import { LevelClearChallengesService } from '../level-clear-challenges.service';
import { UserInfo } from 'src/users/entities/user.entity';
import { Evnet } from '../const/challenges.constant';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
    private readonly levelClearChallengesService: LevelClearChallengesService,
  ) {}

  /**
   * partStatus가 completed로 변경될 때 호출되는 이벤트 (섹션 도전과제 처리)
   */
  @OnEvent(Evnet.PartStatus.Completed)
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
          type: Evnet.PartStatus.Completed,
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
  @OnEvent(Evnet.User.LevelUp)
  async handleLevelChallenge(payload: { user: UserInfo }) {
    const { user } = payload;
    try {
      const userChallengesAndInfo =
        await this.levelClearChallengesService.completedChallenge(user);

      if (userChallengesAndInfo) {
        // SSE 메시지 전송
        this.sseService.notifyUser(user.id, {
          type: Evnet.User.LevelUp,
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
}
