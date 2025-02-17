import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUserChallengeCount() {
    return await this.prisma.userChallenge.count();
  }

  async findSelectedPageUserChallengesInfo(page: number, limit: number) {
    return await this.prisma.userChallenge.findMany({
      skip: (page - 1) * limit, // 건너뛸 항목 수 계산
      take: limit, // 가져올 항목 수
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
