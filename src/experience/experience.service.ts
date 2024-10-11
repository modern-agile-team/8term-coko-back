import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async getUsersExperience() {
    const usersExperience = await this.prisma.users.findMany({
      select: {
        id: true,
        level: true,
        experience: true,
      },
    });
    return usersExperience;
  }

  async getUserExperience(id: number) {
    const userExperience = await this.prisma.users.findUnique({
      where: { id },
      select: {
        experience: true,
      },
    });

    if (!userExperience) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return userExperience;
  }

  async updateExperience(
    id: number,
    updateExperienceData: UpdateExperienceDto,
  ) {
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
      select: {
        id: true,
        level: true,
        experience: true,
        experienceForNextLevel: true,
      },
    });
    return updatedExperience;
  }

  calculateLevel(
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
