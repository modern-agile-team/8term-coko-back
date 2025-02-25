import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';
import { FirstItemBuyChallengesService } from '../first-item-buy.challenges.service';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
    private readonly firstItemBuyChallengesService: FirstItemBuyChallengesService,
  ) {}

  /**
   * partStatus가 completed로 변경될 때, 호출되는 이벤트
   * 전체 섹션이 완료되었는지 체크함
   * @param payload
   */
  @OnEvent('partStatus.completed')
  async handleSectionsChallenge(payload: {
    userId: number;
    sectionId: number;
  }) {
    const { userId, sectionId } = payload;

    const userChallengesAndInfo =
      await this.sectionsChallengesService.chackedByAllPartStatusCompleted(
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
  @OnEvent('itme.buy')
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
