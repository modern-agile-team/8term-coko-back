import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChallengeType,
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

  async findOneByChallenge(
    userId: number,
    challengeId: number,
  ): Promise<UserChallenge> {
    return await this.prisma.userChallenge.findUnique({
      where: { userId_challengeId: { userId, challengeId } },
    });
  }

  async findManyByUserAndChallengeIds(
    userId: number,
    challengeIds: number[],
  ): Promise<UserChallenge[]> {
    return await this.prisma.userChallenge.findMany({
      where: { userId, challengeId: { in: challengeIds } },
      orderBy: {},
    });
  }

  async findManyByUserAndType(
    userId: number,
    lowerCondition: number,
    challengeType: ChallengeType,
  ): Promise<UserChallengesAndInfo[]> {
    return await this.prisma.userChallenge.findMany({
      where: {
        userId,
        completed: false,
        challenge: {
          challengeType,
          condition: { lte: lowerCondition },
        },
      },
      include: { challenge: true },
      orderBy: {
        challenge: {
          condition: 'desc',
        },
      },
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
      where: { userId_challengeId: { userId, challengeId }, completed: false },
      data,
      include: { challenge: true },
    });
  }

  /**
   * 다중 업데이트를 위한 메서드입니다.
   * @param userId 특정 유저를 선택
   * @param challengeIds 업데이트할 도전과제 목록을 가져옴
   * @param data: 업데이트 할 내용
   * completed: false인 값만 true로 변경하면서 업데이트 성능을 향상
   */
  async updateManyUserChallenges(
    userId: number,
    challengeIds: number[],
    data: UpdateUserChallengesDto,
  ) {
    return await this.prisma.userChallenge.updateMany({
      where: {
        userId,
        challengeId: { in: challengeIds },
        completed: false,
      },
      data,
    });
  }

  async updateManyByUserAndType(ids: number[], data: UpdateUserChallengesDto) {
    return await this.prisma.userChallenge.updateMany({
      where: { id: { in: ids }, completed: false },
      data,
    });
  }
}
