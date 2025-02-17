import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserHpService } from '../services/user-hp.service';

@Injectable()
export class HpEventsListener {
  constructor(private readonly userHpService: UserHpService) {}

  @OnEvent('hp.decreased')
  handleHpDecreasedEvent(payload: { userId: number }) {
    const { userId } = payload;
    console.log(`HP 감소 이벤트 수신: userId=${userId}`);

    // 20분 후에 HP 갱신 작업 실행
    setTimeout(
      () => {
        //   this.userHpService.refillHp(userId);
      },
      20 * 60 * 1000,
    );
  }
}
