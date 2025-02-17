import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUserChallengeCount(userId: number) {
    return await this.prisma.userChallenge.count({
      where: { userId },
    });
  }

  async findSelectedPageUserChallengesInfo(
    userId: number,
    page: number,
    limit: number,
  ) {
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

  async createUserChallenge(data) {
    return await this.prisma.userChallenge.create({
      data,
    });
  }

  async updateUserChallengeById(id: number, data) {
    return await this.prisma.userChallenge.update({
      where: { id },
      data,
    });
  }
}
