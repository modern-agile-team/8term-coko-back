import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserHpRepository } from '../repositories/user-hp.repository';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { UserHp } from '../entities/user-hp.entity';
import { HP_FULL_RECHARGE_TIME } from '../constants/user-experience.constant';
import { SseService } from 'src/sse/sse.service';
import { Subscription, timer } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserHpService {
  constructor(
    private readonly userHpRepository: UserHpRepository,
    private readonly sseService: SseService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // private checkRefillTime({ updatedAt }: UserHp): boolean {
  //   const lastUpdated = new Date(updatedAt);
  //   const now = new Date();
  //   const timeDiff = now.getTime() - lastUpdated.getTime();

  //   if (timeDiff >= HP_FULL_RECHARGE_TIME) {
  //     return true;
  //   }

  //   return false;
  // }

  // async findUserHpByUserId(userId: number): Promise<UserHp> {
  //   const userHp = await this.userHpRepository.findUserHpByUserId(userId);

  //   if (!userHp) {
  //     throw new NotFoundException(`id ${userId}'s HP not found`);
  //   }

  //   // 생명력을 가득 채워야하는지 체크
  //   const chackRechargeHp = this.checkRefillTime(userHp);

  //   // 채워야 하면
  //   if (chackRechargeHp) {
  //     // hp를 hpStorage만큼 채움
  //     const newBody: UpdateHpDto = { hp: userHp.hpStorage };
  //     return this.userHpRepository.updateUserHpByUserId(userId, newBody);
  //   }

  //   return userHp;
  // }

  // async updateUserHpByUserId(
  //   userId: number,
  //   body: UpdateHpDto,
  // ): Promise<UserHp> {
  //   const { hp } = body;
  //   const userHp = await this.findUserHpByUserId(userId);
  //   const hpStorage = userHp.hpStorage;

  //   if (hp > hpStorage) {
  //     throw new BadRequestException(
  //       `hp(${hp})는 hpStorage(${hpStorage})보다 작아야 합니다.`,
  //     );
  //   }

  //   return this.userHpRepository.updateUserHpByUserId(userId, body);
  // }

  // 타이머 정보 저장 객체
  private refillTimers = new Map<number, Subscription>();

  /**
   * userHp 조회 메서드
   * @param userId
   * @returns
   */
  async findUserHpByUserId(userId: number) {
    const userHpInfo = await this.userHpRepository.findUserHpByUserId(userId);

    if (!userHpInfo) {
      throw new NotFoundException(`id ${userId}'s HP not found`);
    }

    return userHpInfo;
  }

  /**
   * hp 감소 메서드
   */
  async decreaseUserHpByUserId(userId: number): Promise<UserHp> {
    const userHp = await this.userHpRepository.findUserHpByUserId(userId);

    if (!userHp) {
      throw new NotFoundException(`id ${userId}'s HP not found`);
    }

    if (userHp.hp === 0) {
      throw new BadRequestException(`id ${userId}'s HP is 0`);
    }

    // hp 감소
    const decreasedHpValue =
      await this.userHpRepository.decreaseUserHpByUserId(userId);

    // 이벤트 발행
    this.eventEmitter.emit('hp.decreased', {
      userId,
      decreasedHpValue,
      hpStorage: userHp.hpStorage,
    });

    return decreasedHpValue;
  }

  /**
   * hp refill 메서드 ( 이벤트 리스너에서 호출 )
   * @param userId
   * @param hpStorage
   * @param decreasedHp
   * @returns
   */
  async refillHpByUserId(
    userId: number,
    hpStorage: number,
    decreasedHp: number,
  ): Promise<UserHp> {
    const refillHpValue = hpStorage - decreasedHp;
    const updatedHp = await this.userHpRepository.refillUserHpByUserId(
      userId,
      refillHpValue,
    );

    this.sseService.notifyUser(userId, {
      type: 'hp_refilled',
      message: '생명력이 채워졌습니다.',
      data: updatedHp,
      timestamp: new Date().toISOString(),
    });

    return updatedHp;
  }

  /**
   * 타이머 관리 메서드 ( 이벤트 리스너에서 호출 )
   * @param userId
   * @param hpStorage
   * @param decreasedHp
   * @param delayMs
   */
  scheduleRefillTimer(
    userId: number,
    hpStorage: number,
    decreasedHp: number,
    delayTime: number,
  ) {
    /**
     * 기존 타이머가 있으면 취소
     * has() - refillTimer에 subscription 있는지 확인
     * get().unsubscribe 가져온 정보의 subscription 취소
     * delete() subscription 삭제
     * 'subscription' 은 '구독 정보' 정도로 생각하면 될 것 같습니다.
     */
    if (this.refillTimers.has(userId)) {
      this.refillTimers.get(userId).unsubscribe();
      this.refillTimers.delete(userId);
    }

    // rxjs timer를 사용해 예약
    const timerSubscription = timer(delayTime).subscribe(async () => {
      await this.refillHpByUserId(userId, hpStorage, decreasedHp);
      this.refillTimers.delete(userId);
    });

    // 새 subscription 저장
    this.refillTimers.set(userId, timerSubscription);
  }
}
