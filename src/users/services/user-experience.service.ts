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
    this.emitMissingLevelMilestoneEvents(user, updatedExperience);

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

  /**
   * 기존 레벨과 업데이트 된 후의 레벨을 비교해서 레벨 도전과제 이벤트를 몇번 실행해야할지 계산함
   * 예를 들어
   *
   * 기존 레벨: 8, 업데이트된 레벨: 21 일 경우
   * user.level10Up 이벤트: { userInfo, 10 },
   * user.level10Up 이벤트: { userInfo, 20 }
   * 두개의 이벤트를 발생함
   *
   * @param oldUser
   * @param updatedUser
   */
  private emitMissingLevelMilestoneEvents(
    oldUser: UserInfo,
    updatedUser: UserInfo,
  ): void {
    for (
      let completedLevel = 10;
      completedLevel <= updatedUser.level;
      completedLevel += 10
    ) {
      if (completedLevel > oldUser.level) {
        this.eventEmitter.emit('user.level10Up', {
          userId: updatedUser.id,
          completedLevel,
        });
      }
    }
  }
}
