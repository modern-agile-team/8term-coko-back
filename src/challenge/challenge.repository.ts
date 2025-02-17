import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryChallengeDto } from './dto/query-challenge.dto';
import { Challenge } from './challenge.interface';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalChallengeCount(): Promise<number> {
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

  async createChallenge(data: CreateChallengeDto): Promise<Challenge> {
    return await this.prisma.challenge.create({
      data,
    });
  }

  async updateChallengeById(
    id: number,
    data: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  async deleteChallengeById(id: number): Promise<Challenge> {
    return await this.prisma.challenge.delete({
      where: { id },
    });
  }
}
