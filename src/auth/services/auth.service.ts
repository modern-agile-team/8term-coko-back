import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/services/users.service';
import { RedisService } from '../redis/redis.service';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async socialLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const {
      provider,
      providerId,
      name,
      socialAccessToken,
      socialRefreshToken,
    } = user;

    // #1 유저생성(유저 hp 생성 및 유저 part 생성) → #2 소셜토큰 저장
    const userInfo = await this.prisma.$transaction(async (tx) => {
      // #1 유저 정보 조회 및 생성(유저 hp 생성 및 유저 part 생성)
      const userInfo = await this.findOrCreateUser(
        provider,
        providerId,
        name,
        tx,
      );

      // #2 소셜 토큰 저장
      await this.saveSocialToken(
        socialAccessToken,
        socialRefreshToken,
        userInfo.id,
        tx,
      );

      return userInfo;
    });

    // JWT 생성
    const accessToken = await this.tokenService.createAccessToken(userInfo.id);
    const refreshToken = await this.tokenService.createRefreshToken(
      userInfo.id,
    );

    // redis에 refresh 토큰 저장
    await this.redisService.set(String(userInfo.id), refreshToken);

    return { accessToken, refreshToken };
  }

  // 조회한 유저정보가 없다면 생성하느 메서드
  private async findOrCreateUser(
    provider: string,
    providerId: string,
    name: string,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    // 기존 유저 정보 조회
    const existingUser = await txOrPrisma.user.findUnique({
      where: { providerId },
    });

    if (existingUser) return existingUser;

    // 유저 정보 생성
    return await this.userService.createUser(
      provider,
      providerId,
      name,
      txOrPrisma,
    );
  }

  // 소셜 토큰 저장
  private saveSocialToken(
    socialAccessToken: string,
    socialRefreshToken: string,
    userId: number,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    return txOrPrisma.token.upsert({
      where: { userId },
      create: { socialAccessToken, socialRefreshToken, userId },
      update: { socialAccessToken, socialRefreshToken },
    });
  }
}
