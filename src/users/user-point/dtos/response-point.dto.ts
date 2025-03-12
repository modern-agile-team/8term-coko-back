import { User } from '@prisma/client';

export class ResponsePointDto {
  readonly id: number;
  readonly name?: string;
  readonly point: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.point = user.point;
  }
}
