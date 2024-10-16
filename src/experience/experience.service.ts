import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseExperienceDto } from './dto/response-experience.dto';
import { INCREASE_MULTIPLIER, LEVEL_UP } from './constants/experience.constant';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async getUsersExperience() {
    const usersExperience = await this.prisma.users.findMany({
      select: {
        id: true,
        nickname: true,
        level: true,
        experience: true,
        experienceForNextLevel: true,
      },
    });
    return usersExperience;
  }

  async getUserExperience(id: number): Promise<ResponseExperienceDto> {
    const userExperience = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!userExperience) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return new ResponseExperienceDto(userExperience);
  }

  async updateExperience(
    id: number,
    updateExperienceData: UpdateExperienceDto,
  ): Promise<ResponseExperienceDto> {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const { userLevel, userExperience, experienceForNextLevel } =
      this.calculateLevel(
        user.level,
        user.experience,
        user.experienceForNextLevel,
        updateExperienceData.experience,
      );

    const updatedExperience = await this.prisma.users.update({
      where: { id },
      data: {
        level: userLevel,
        experience: userExperience,
        experienceForNextLevel: experienceForNextLevel,
      },
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
    if (userExperience >= experienceForNextLevel) {
      userLevel += LEVEL_UP;
      userExperience -= experienceForNextLevel;
      experienceForNextLevel = Math.floor(
        experienceForNextLevel * INCREASE_MULTIPLIER,
      );
    }
    return { userLevel, userExperience, experienceForNextLevel };
  }
}
