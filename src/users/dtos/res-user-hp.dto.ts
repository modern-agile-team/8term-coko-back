import { UserHp } from '../entities/user-hp.entity';

export class ResUserHpDto {
  readonly userId: number;
  readonly hp: number;
  readonly hpStorage: number;

  constructor(userHp: UserHp) {
    this.userId = userHp.userId;
    this.hp = userHp.hp;
    this.hpStorage = userHp.hpStorage;
  }
}
