import { UpdateExperienceDto } from './update-experience.dto';
import { Users } from '@prisma/client';

export class ResponseExperienceDto extends UpdateExperienceDto {
  readonly id: number;
  readonly nickname: string;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;

  constructor(user: Users) {
    super();
    this.id = user.id;
    this.nickname = user.nickname;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
  }
}
