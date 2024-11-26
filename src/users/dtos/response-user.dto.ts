import { User } from '@prisma/client';

export class ResponseUserDto {
  readonly id: number;
  readonly name: string;
  readonly profileImage: string;
  readonly maxHealthPoint: number;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;
  readonly point: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.profileImage = user.profileImage;
    this.maxHealthPoint = user.maxHealthPoint;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
  }
}
