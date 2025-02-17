import { Injectable } from '@nestjs/common';
import { CreateChallengesDto } from './dto/create-challenges.dto';
import { UpdateChallengesDto } from './dto/update-challenges.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Challenge } from './challenges.interface';

@Injectable()
export class ChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalChallengesCount(): Promise<number> {
    return await this.prisma.challenge.count();
  }

  async findSelectedPageChallengessInfo(
    page: number,
    limit: number,
  ): Promise<Challenge[]> {
    return await this.prisma.challenge.findMany({
      skip: (page - 1) * limit, // 건너뛸 항목 수 계산
      take: limit, // 가져올 항목 수
    });
  }

  async findOneById(id: number): Promise<Challenge> {
    return await this.prisma.challenge.findUnique({
      where: { id },
    });
  }

  async findOneByBadgeName(badgeName: string): Promise<Challenge> {
    return await this.prisma.challenge.findUnique({
      where: { badgeName },
    });
  }

  async createChallenges(data: CreateChallengesDto): Promise<Challenge> {
    return await this.prisma.challenge.create({
      data,
    });
  }

  async updateChallengesById(
    id: number,
    data: UpdateChallengesDto,
  ): Promise<Challenge> {
    return await this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  async deleteChallengesById(id: number): Promise<Challenge> {
    return await this.prisma.challenge.delete({
      where: { id },
    });
  }
}
