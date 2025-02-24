import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';
import { LevelClearChallengesService } from '../level-clear-challenges.service';
import { UserInfo } from 'src/users/entities/user.entity';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
    private readonly levelClearChallengesService: LevelClearChallengesService,
  ) {}

  /**
   * 유저가 레벨 10업 했을 때 마다 호출되는 이벤트
   */
  @OnEvent('partStatus.completed')
  async handleSectionsChallenge(payload: {
    userId: number;
    sectionId: number;
  }) {
    const { userId, sectionId } = payload;

    const userChallengesAndInfo =
      await this.sectionsChallengesService.checkAndCompleteSectionChallenge(
        userId,
        sectionId,
      );

    if (userChallengesAndInfo) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: 'partStatus.completed',
        message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * partStatus가 completed로 변경될 때, 호출되는 이벤트
   * 전체 섹션이 완료되었는지 체크함
   * @param payload
   */
  @OnEvent('user.level10Up')
  async handleLevelChallenge(payload: {
    userId: number;
    completedLevel: number;
  }) {
    const { userId, completedLevel } = payload;

    const userChallengesAndInfo =
      await this.levelClearChallengesService.chackedByUserLevel(
        userId,
        completedLevel,
      );

    if (userChallengesAndInfo) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: 'user.level10Up',
        message: `도전과제 완료 : ${userChallengesAndInfo.challenge.content}`,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
