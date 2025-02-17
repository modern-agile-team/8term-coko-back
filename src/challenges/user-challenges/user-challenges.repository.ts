import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserChallengesAndInfo } from './user-challenges.interface';

@Injectable()
export class UserChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUserChallengesCount(userId: number) {
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

  async findOneById(id: number) {
    return await this.prisma.userChallenge.findUnique({
      where: { id },
    });
  }

  async createUserChallenges(data) {
    return await this.prisma.userChallenge.create({
      data,
    });
  }

  async updateUserChallengesById(id: number, data) {
    return await this.prisma.userChallenge.update({
      where: { id },
      data,
    });
  }
}
