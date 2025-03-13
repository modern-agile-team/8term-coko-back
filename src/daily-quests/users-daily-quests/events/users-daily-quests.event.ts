import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT } from 'src/common/constants/event-constants';
import { Progress } from 'src/progress/entities/progress.entity';
import { SseService } from 'src/sse/sse.service';
import { UsersDailyQuestsService } from '../users-daily-quests.service';

@Injectable()
export class UsersDailyQuestsEventsListener {
  constructor(
    private readonly sseService: SseService,
    private readonly usersDailyQuestsService: UsersDailyQuestsService,
  ) {}

  /**
   * 유저 문제진행도 (progress)가  업데이트 될 때 호출되는 이벤트
   */
  @OnEvent(EVENT.PROGRESS.UPDATED)
  async handleProgressUpdatedEvent(progress: Progress) {
    const { userId } = progress;
    try {
      const userDailyQuestInfo =
        await this.usersDailyQuestsService.update(userId);

      if (userDailyQuestInfo && userDailyQuestInfo.completed) {
        // SSE 메시지 전송
        this.sseService.notifyUser(userId, {
          type: EVENT.PROGRESS.UPDATED,
          message: `오늘의 퀘스트 완료!`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(
        `handleProgressUpdatedEvent 에러 발생 (userId: ${userId}:`,
        error,
      );
    }
  }
}
