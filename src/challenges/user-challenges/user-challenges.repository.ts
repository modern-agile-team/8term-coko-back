import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UserChallenge,
  UserChallengesAndInfo,
} from './user-challenges.interface';
import { CreateUserChallengesDto } from './dto/create-user-challenges.dto';
import { UpdateUserChallengesDto } from './dto/update-user-challenges.dto';

@Injectable()
export class UserChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUserChallengesCount(userId: number): Promise<number> {
    return await this.prisma.userChallenge.count({
      where: { userId },
    });
  }

  async findSelectedPageUserChallengessInfo(
    userId: number,
    page: number,
    limit: number,
  ): Promise<UserChallengesAndInfo[]> {
    return await this.prisma.userChallenge.findMany({
      where: { userId },
      skip: (page - 1) * limit, // 건너뛸 항목 수 계산
      take: limit, // 가져올 항목 수
      include: { challenge: true },
    });
  }

  async findOneById(id: number): Promise<UserChallenge> {
    return await this.prisma.userChallenge.findUnique({
      where: { id },
    });
  }

  async createUserChallenges(
    data: CreateUserChallengesDto,
  ): Promise<UserChallenge> {
    return await this.prisma.userChallenge.create({
      data,
    });
  }

  async updateUserChallengesByUserId(
    userId: number,
    challengeId: number,
    data: UpdateUserChallengesDto,
  ): Promise<UserChallengesAndInfo> {
    return await this.prisma.userChallenge.update({
      where: { userId_challengeId: { userId, challengeId } },
      data,
      include: { challenge: true },
    });
  }
}
