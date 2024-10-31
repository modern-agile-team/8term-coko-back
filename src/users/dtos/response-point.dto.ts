import { User } from '@prisma/client';

export class ResponsePointDto {
  readonly id: number;
  readonly nickname?: string;
  readonly point: number;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.point = user.point;
  }
}
