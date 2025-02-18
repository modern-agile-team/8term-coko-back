import { ApiProperty } from '@nestjs/swagger';
import { UserHp } from '../entities/user-hp.entity';

export class ResUserHpDto {
  @ApiProperty({ example: 12 })
  readonly userId: number;

  @ApiProperty({ example: 7 })
  readonly hp: number;

  @ApiProperty({ example: 10 })
  readonly hpStorage: number;

  constructor(userHp: UserHp) {
    this.userId = userHp.userId;
    this.hp = userHp.hp;
    this.hpStorage = userHp.hpStorage;
  }
}
