import { Injectable } from '@nestjs/common';
import { SectionsChallengesService } from '../section-clear-challenges.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SseService } from 'src/sse/sse.service';

@Injectable()
export class ChallengesEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly sectionsChallengesService: SectionsChallengesService,
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

    const completed =
      await this.sectionsChallengesService.chackedByAllPartStatusCompleted(
        userId,
        sectionId,
      );

    if (completed) {
      //sse메시지
      this.sseService.notifyUser(userId, {
        type: 'partStatus.completed',
        message: '도전과제 섹션 1번 클리어!',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
