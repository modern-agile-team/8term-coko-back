import { users } from '@prisma/client';

export class ResponseUserDto {
  readonly id: number;
  readonly nickname: string;
  readonly profileImage: string;
  readonly maxHealthPoint: number;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;
  readonly point: number;

  constructor(user: users) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.profileImage = user.profileImage;
    this.maxHealthPoint = user.maxHealthPoint;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
  }
}
