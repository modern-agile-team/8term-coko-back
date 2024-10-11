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
    const experienceForNextLevel = { nowExperience: 50 };

    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const { userLevel, userExperience, nowExperience } = this.calculateLevel(
      user.experience,
      user.level,
      updateExperienceData.experience,
      experienceForNextLevel.nowExperience,
    );

    console.log(userLevel, userExperience, nowExperience);

    const updatedExperience = await this.prisma.users.update({
      where: { id },
      data: {
        experience: userExperience,
        level: userLevel,
      },
      select: {
        id: true,
        level: true,
        experience: true,
      },
    });
    return updatedExperience;
  }

  calculateLevel(
    userExperience: number,
    userLevel: number,
    updateExperience: number,
    nowExperience: number,
  ) {
    userExperience += updateExperience;
    if (userExperience >= nowExperience) {
      userLevel += 1;
      userExperience -= nowExperience;
      nowExperience *= 1.2;
    }
    return { userLevel, userExperience, nowExperience };
  }
}
