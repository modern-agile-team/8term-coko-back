import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';
import { Part } from 'src/parts/entities/part.entity';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';
import { UsersRepository } from '../repositories/users.reposirory';
import { TokenService } from 'src/auth/services/token.service';
import { RedisService } from 'src/auth/redis/redis.service';
import { CookieService } from 'src/auth/services/cookie.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async createDefaultPartProgress(txOrPrisma: any = this.prisma) {
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
    const defaulPartProgress = await this.createDefaultPartProgress(txOrPrisma);

    // 유저 생성시 기본 유저 생명력 생성
    const userResponse = await txOrPrisma.user.create({
      data: {
        provider,
        providerId,
        name,
        partProgress: { create: defaulPartProgress },
        userHp: { create: {} },
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

  async getMyToken(userId: number): Promise<any> {
    const userTokenInfo = await this.prisma.token.findUnique({
      where: { userId },
    });
    if (!userTokenInfo) {
      throw new NotFoundException(`userId ${userId} not found`);
    }
    return userTokenInfo;
  }
}
