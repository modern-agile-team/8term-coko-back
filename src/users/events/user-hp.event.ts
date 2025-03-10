import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserHpService } from '../services/user-hp.service';
import { HP_REFILL_TIME } from '../constants/user-hp.constant';
import { EVENT } from 'src/common/constants/event-constants';

@Injectable()
export class HpEventsListener {
  constructor(private readonly userHpService: UserHpService) {}

  /**
   * hp 감소시 이벤트
   * @param payload
   */
  @OnEvent(EVENT.HP.DECREASED)
  handleHpDecreasedEvent(payload: {
    userId: number;
    decreasedHpValue: any;
    hpStorage: number;
  }) {
    const { userId, decreasedHpValue, hpStorage } = payload;

    // 해당 이벤트 발행시 timer 예약 메서드 호출
    this.userHpService.scheduleRefillTimer(
      userId,
      hpStorage,
      decreasedHpValue.hp,
      HP_REFILL_TIME,
    );
  }
}
