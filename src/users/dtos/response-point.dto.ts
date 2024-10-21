import { users } from '@prisma/client';

export class ResponsePointDto {
  readonly id: number;
  readonly nickname?: string;
  readonly point: number;

  constructor(user: users) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.point = user.point;
  }
}
