import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChallengeType,
  UserChallenge,
  UserChallengesAndInfo,
} from './user-challenges.interface';
import { CreateUserChallengesDto } from './dto/create-user-challenges.dto';
import { UpdateUserChallengesDto } from './dto/update-user-challenges.dto';
import { QueryUserChallengesDto } from './dto/query-user-challenges.dto';

@Injectable()
export class UserChallengesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalUserChallengesCount(
    userId: number,
    query: QueryUserChallengesDto,
  ): Promise<number> {
    const { challengeType, completed } = query;
    return await this.prisma.userChallenge.count({
      where: {
        userId,
        ...(completed === undefined ? {} : { completed }),
        challenge: {
          ...(challengeType && { challengeType }),
        },
      },
    });
  }

  async findSelectedPageUserChallengessInfo(
    userId: number,
    page: number,
    limit: number,
    challengeType: ChallengeType,
    completed: boolean,
  ): Promise<UserChallengesAndInfo[]> {
    return await this.prisma.userChallenge.findMany({
      where: {
        userId,
        challenge: { challengeType },
        ...(completed === undefined ? {} : { completed }),
      },
      skip: (page - 1) * limit, // 건너뛸 항목 수 계산
      take: limit, // 가져올 항목 수
      include: { challenge: true },
      orderBy: [
        { completed: 'desc' },
        { challenge: { challengeType: 'asc' } },
        { challenge: { condition: 'asc' } },
      ],
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

  //Event 핸들러에서 호출할 서비스 메서드에서 사용
  async findOneByUserAndType(
    userId: number,
    lowerCondition: number,
    challengeType: ChallengeType,
  ): Promise<UserChallengesAndInfo> {
    return await this.prisma.userChallenge.findFirst({
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

  //Event 핸들러에서 호출할 서비스 메서드에서 사용
  async findManyByUserAndType(
    userId: number,
    challengeType: ChallengeType,
    lowerCondition?: number,
  ): Promise<UserChallengesAndInfo[]> {
    return await this.prisma.userChallenge.findMany({
      where: {
        userId,
        completed: false,
        challenge: {
          challengeType,
          condition: { ...(lowerCondition && { lte: lowerCondition }) },
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

  //Event 핸들러에서 호출할 서비스 메서드에서 사용
  async updateById(
    id: number,
    data: UpdateUserChallengesDto,
  ): Promise<UserChallengesAndInfo> {
    return await this.prisma.userChallenge.update({
      where: { id, completed: false },
      data,
      include: { challenge: true },
    });
  }

  //Event 핸들러에서 호출할 서비스 메서드에서 사용
  async updateManyByIds(ids: number[], data: UpdateUserChallengesDto) {
    return await this.prisma.userChallenge.updateMany({
      where: { id: { in: ids }, completed: false },
      data,
    });
  }

  //Event 핸들러에서 호출할 서비스 메서드에서 사용 (랭킹 도전과제에서만 사용됨)
  async findOneRankingByUserAndType(
    userId: number,
    challengeType: ChallengeType,
    exactCondition: number,
  ): Promise<UserChallenge> {
    return await this.prisma.userChallenge.findFirst({
      where: {
        userId,
        challenge: {
          challengeType,
          condition: exactCondition,
        },
      },
      include: { challenge: true },
    });
  }

  //Event 핸들러에서 호출할 서비스 메서드에서 사용 (랭킹 도전과제에서만 사용됨)
  async updateRankingChallengeById(
    id: number,
    data: UpdateUserChallengesDto,
  ): Promise<UserChallengesAndInfo> {
    return await this.prisma.userChallenge.update({
      where: { id },
      data,
      include: { challenge: true },
    });
  }
}
