import { Users } from '@prisma/client';
import { UpdatePointDto } from './update-point.dto';

export class ResponsePointDto extends UpdatePointDto {
  readonly id: number;
  readonly nickname?: string;
  readonly point: number;

  constructor(user: Users) {
    super();
    this.id = user.id;
    this.nickname = user.nickname;
    this.point = user.point;
  }
}
