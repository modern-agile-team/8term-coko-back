import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryChallengeDto } from './dto/query-challenge.dto';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalChallengeCount() {
    return await this.prisma.challenge.count();
  }

  async findSelectedPageChallengesInfo(page: number, limit: number) {
    return await this.prisma.challenge.findMany({
      skip: (page - 1) * limit, // 건너뛸 항목 수 계산
      take: limit, // 가져올 항목 수
    });
  }

  async findOneById(id: number) {
    return await this.prisma.challenge.findUnique({
      where: { id },
    });
  }

  async findOneByBadgeName(badgeName: string) {
    return await this.prisma.challenge.findUnique({
      where: { badgeName },
    });
  }

  async createChallenge(data: CreateChallengeDto) {
    return await this.prisma.challenge.create({
      data,
    });
  }

  async updateChallengeById(id: number, data: UpdateChallengeDto) {
    return await this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  async deleteChallengeById(id: number) {
    return await this.prisma.challenge.delete({
      where: { id },
    });
  }
}
