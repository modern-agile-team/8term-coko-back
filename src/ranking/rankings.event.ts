import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TOTAL_CORRECT_ANSWER_UPDATE_TIME } from './ranking.constant';
import { RankingsService } from './rankings.service';
import { EVENT } from 'src/common/constants/event-constants';

@Injectable()
export class RankingEventsListener {
  constructor(private readonly rankingsService: RankingsService) {}

  /**
   * 퀴즈 정답시 랭킹 반영 이벤트
   * @param payload
   */
  @OnEvent(EVENT.QUIZ_CORRECT)
  handleQuizCorrectEvent(payload: { userId: number; isCorrect: boolean }) {
    const { userId, isCorrect } = payload;

    // 해당 이벤트 발행시 timer 예약 메서드 호출
    this.rankingsService.scheduleTotalCorrectAnswerUpdateTimers(
      userId,
      isCorrect,
      TOTAL_CORRECT_ANSWER_UPDATE_TIME,
    );
  }
}
