import { User } from '@prisma/client';

export class ResponseUserDto {
  readonly id: number;
  readonly provider: string;
  readonly providerId: string;
  readonly name: string;
  readonly profileImage: string;
  readonly maxHealthPoint: number;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;
  readonly point: number;
  readonly lastLogin: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.provider = user.provider;
    this.providerId = user.providerId;
    this.name = user.name;
    this.profileImage = user.profileImage;
    this.maxHealthPoint = user.maxHealthPoint;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
    this.lastLogin = user.lastLogin;
    this.createdAt = user.createdAt;
    this.updatedAt = user.createdAt;
  }
}
