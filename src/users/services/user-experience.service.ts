import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseExperienceDto } from '../dtos/response-experience.dto';
import {
  INCREASE_MULTIPLIER,
  LEVEL_UP,
} from '../constants/user-experience.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserInfo } from '../entities/user.entity';
import { Evnet } from 'src/challenges/const/challenges.constant';

@Injectable()
export class UserExperienceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getUserExperience(id: number): Promise<ResponseExperienceDto> {
    const userExperience = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExperience) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return new ResponseExperienceDto(userExperience);
  }

  async updateExperience(
    user: UserInfo,
    updateExperienceData: UpdateExperienceDto,
  ): Promise<ResponseExperienceDto> {
    const { userLevel, userExperience, experienceForNextLevel } =
      this.calculateLevel(
        user.level,
        user.experience,
        user.experienceForNextLevel,
        updateExperienceData.experience,
      );

    const updatedExperience = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        level: userLevel,
        experience: userExperience,
        experienceForNextLevel: experienceForNextLevel,
      },
    });

    // 이벤트 발생
    this.eventEmitter.emit(Evnet.User.LevelUp, {
      user: updatedExperience,
    });

    return new ResponseExperienceDto(updatedExperience);
  }

  private calculateLevel(
    userLevel: number,
    userExperience: number,
    experienceForNextLevel: number,
    updateExperience: number,
  ) {
    userExperience += updateExperience;
    while (userExperience >= experienceForNextLevel) {
      userLevel += LEVEL_UP;
      userExperience -= experienceForNextLevel;
      experienceForNextLevel = Math.floor(
        experienceForNextLevel * INCREASE_MULTIPLIER,
      );
    }
    return { userLevel, userExperience, experienceForNextLevel };
  }
}
