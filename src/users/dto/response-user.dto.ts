import { Users } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends CreateUserDto {
  readonly id: number;
  readonly nickname: string;
  readonly maxHealthPoint: number;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;
  readonly point: number;

  constructor(user: Users) {
    super();
    this.id = user.id;
    this.nickname = user.nickname;
    this.maxHealthPoint = user.maxHealthPoint;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
    this.point = user.point;
  }
}
