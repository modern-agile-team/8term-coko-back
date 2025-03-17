import { User } from '@prisma/client';

export class ResponseExperienceDto {
  readonly id: number;
  readonly name: string;
  readonly level: number;
  readonly experience: number;
  readonly experienceForNextLevel: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.level = user.level;
    this.experience = user.experience;
    this.experienceForNextLevel = user.experienceForNextLevel;
  }
}
