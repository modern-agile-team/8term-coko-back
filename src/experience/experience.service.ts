import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ResponseExperienceDto } from './dto/response-experience.dto';

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
      userLevel += 1;
      userExperience -= experienceForNextLevel;
      experienceForNextLevel = Math.floor(experienceForNextLevel * 1.2);
    }
    return { userLevel, userExperience, experienceForNextLevel };
  }
}
