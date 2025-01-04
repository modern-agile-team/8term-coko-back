import { UserHp } from '../entities/user-hp.entity';

export class ResUserHpDto {
  readonly id: number;
  readonly userId: number;
  readonly hp: number;
  readonly hpStorage: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(userHp: UserHp) {
    this.id = userHp.id;
    this.userId = userHp.userId;
    this.hp = userHp.hp;
    this.hpStorage = userHp.hpStorage;
    this.createdAt = userHp.createdAt;
    this.updatedAt = userHp.createdAt;
  }
}
