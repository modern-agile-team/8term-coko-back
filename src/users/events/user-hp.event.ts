import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserHpService } from '../services/user-hp.service';
import { HP_REFILL_TIME } from '../constants/user-hp.constant';

@Injectable()
export class HpEventsListener {
  constructor(private readonly userHpService: UserHpService) {}

  /**
   * hp 감소시 이벤트
   * @param payload
   */
  @OnEvent('hp.decreased')
  handleHpDecreasedEvent(payload: {
    userId: number;
    decreasedHpValue: any;
    hpStorage: number;
  }) {
    const { userId, decreasedHpValue, hpStorage } = payload;

    // timer 예약 메서드 호출
    this.userHpService.scheduleRefillTimer(
      userId,
      hpStorage,
      decreasedHpValue.hp,
      HP_REFILL_TIME,
    );
  }
}
