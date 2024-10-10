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

  async updateUserExperience(
    id: number,
    updateExperienceData: UpdateExperienceDto,
  ) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const updatedUserLevel: number = this.calculateLevel(
      user.experience,
      updateExperienceData.experience,
    );

    const userExperience = await this.prisma.users.update({
      where: { id },
      data: {
        experience: { increment: updateExperienceData.experience },
        level: updatedUserLevel,
      },
      select: {
        id: true,
        level: true,
        experience: true,
      },
    });
    return userExperience;
  }

  calculateLevel(userExperience: number, updateExperience: number) {
    userExperience += updateExperience;
    const userlevel = Math.floor(userExperience / 100);

    return userlevel;
  }
}
