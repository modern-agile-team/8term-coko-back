import { Injectable } from '@nestjs/common';
import { CreateChallengesDto } from './dto/create-challenges.dto';
import { UpdateChallengesDto } from './dto/update-challenges.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Challenge } from './challenges.interface';
import { ChallengeType } from './const/challenges.constant';

@Injectable()
export class ChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalChallengesCount(): Promise<number> {
    return await this.prisma.challenge.count();
  }

  async findSelectedPageChallengesInfo(
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

  async findOneByTypeAndCondition(
    challengeType: ChallengeType,
    condition: number,
  ): Promise<Challenge> {
    return await this.prisma.challenge.findUnique({
      where: { challengeType_condition: { challengeType, condition } },
    });
  }

  async findManyByTypeAndConditions(
    challengeType: ChallengeType,
    conditions: number[],
  ): Promise<Challenge[]> {
    return await this.prisma.challenge.findMany({
      where: { challengeType, condition: { in: conditions } },
    });
  }

  async createChallenge(
    body: CreateChallengesDto,
    defaultUserChallenges: { userId: number }[],
  ): Promise<Challenge> {
    return await this.prisma.challenge.create({
      data: {
        ...body,
        UserChallenge: { create: defaultUserChallenges },
      },
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
