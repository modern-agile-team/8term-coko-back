import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from './dtos/response-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';
import { Part } from 'src/parts/entities/part.entity';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';
import { UsersRepository } from './users.reposirory';
import { Challenge } from 'src/challenges/challenges.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async createDefaultPartProgress(
    txOrPrisma: any = this.prisma,
  ): Promise<
    {
      partId: number;
      status: PartStatus;
    }[]
  > {
    const parts = await txOrPrisma.part.findMany();

    return parts.map((part: Part) => {
      let defaultStatus: PartStatus;

      if (part.order === 1) {
        defaultStatus = PartStatusValues.STARTED;
      } else {
        defaultStatus = PartStatusValues.LOCKED;
      }

      return {
        partId: part.id,
        status: defaultStatus,
      };
    });
  }

  private async createDefaultUserChallenges(
    txOrPrisma: any = this.prisma,
  ): Promise<{ challengeId: number }[]> {
    const challenges = await txOrPrisma.challenge.findMany({
      select: { id: true },
    });

    return challenges.map((challenge: Challenge) => {
      return { challengeId: challenge.id };
    });
  }

  private async createDefaultUserItems(
    txOrPrisma: any = this.prisma,
  ): Promise<{ itemId: number; isEquipped: boolean; purchasedAt: Date }[]> {
    const defaultItem = await txOrPrisma.item.findUnique({
      where: { name: '파랑 물약' },
    });

    if (!defaultItem) {
      throw new NotFoundException(
        '기본 아이템(파랑 물약)이 items 테이블에 존재하지 않습니다.',
      );
    }

    return [
      {
        itemId: defaultItem.id,
        isEquipped: true,
        purchasedAt: new Date(),
      },
    ];
  }

  getAllUsers(): Promise<ResponseUserDto[]> {
    return this.prisma.user.findMany();
  }

  async createUser(
    provider: string,
    providerId: string,
    name: string,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ): Promise<ResponseUserDto> {
    // 유저 생성시 디폴트 파트 진행도를 생성
    const defaultPartProgress =
      await this.createDefaultPartProgress(txOrPrisma);

    // 유저 생성시 디폴트 유저 도전과제를 생성
    const defaultUserChallenges =
      await this.createDefaultUserChallenges(txOrPrisma);

    // 유저 생성시 기본 유저 아이템을 생성
    const defaultUserItems = await this.createDefaultUserItems(txOrPrisma);

    // 유저 생성시 기본 유저 생명력 생성
    const userResponse = await txOrPrisma.user.create({
      data: {
        provider,
        providerId,
        name,
        partProgress: { create: defaultPartProgress },
        userHp: { create: {} },
        userChallenge: { create: defaultUserChallenges },
        userItems: { create: defaultUserItems },
      },
    });

    // 유저 생성 실패 시 예외 처리
    if (!userResponse) {
      throw new NotFoundException();
    }

    return userResponse;
  }

  async getUser(userId: number): Promise<ResponseUserDto> {
    const userResponse = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userResponse) {
      throw new NotFoundException(`id ${userId} not found`);
    }
    return new ResponseUserDto(userResponse);
  }

  async updateUser(
    userId: number,
    updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    if (!(await this.prisma.user.findUnique({ where: { id: userId } }))) {
      throw new NotFoundException(`id ${userId} not found`);
    }

    const userResponse = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserData,
    });

    return new ResponseUserDto(userResponse);
  }

  /**
   * 회원 탈퇴시 사용
   */
  async deleteUser(userId: number, res: Response): Promise<void> {
    await this.usersRepository.deleteUserInfo(userId);
  }

  /**
   * 소셜 제공자 정보 가져오기
   * @param userId
   * @returns
   */
  async getProviderInfo(userId: number): Promise<string> {
    const { provider } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { provider: true },
    });

    return provider;
  }
}
