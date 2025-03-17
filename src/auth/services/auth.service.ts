import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/users.service';
import { RedisService } from '../redis/redis.service';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  /**
   * 소셜 로그인
   * @param user
   * @returns
   */
  async socialLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const {
      provider,
      providerId,
      name,
      email,
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
        email,
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

  /**
   * 회원 탈퇴 메서드
   * @param userId
   * @param res
   */
  async withdraw(userId: number, res: Response) {
    const providerInfo = await this.usersService.getProviderInfo(userId);
    const tokenInfo = await this.tokenService.getMyToken(userId);
    const socialToken = tokenInfo.socialAccessToken;
    let revokeUrl = '';

    if (providerInfo === 'google') {
      revokeUrl = `https://accounts.google.com/o/oauth2/revoke?token=${socialToken}`;

      try {
        await lastValueFrom(
          this.httpService.post(
            revokeUrl,
            {},
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );
      } catch (revokeError) {
        this.logger.error(revokeError);
      }
    }
    if (providerInfo === 'kakao') {
      revokeUrl = 'https://kapi.kakao.com/v1/user/unlink';

      try {
        await lastValueFrom(
          this.httpService.post(
            revokeUrl,
            {},
            {
              headers: {
                Authorization: `Bearer ${socialToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );
      } catch (revokeError) {
        this.logger.error(revokeError);
      }
    }
    if (providerInfo === 'github') {
      revokeUrl = `https://api.github.com/applications/${this.configService.get<string>('GITHUB_CLIENT_ID')}/grant`;

      try {
        await lastValueFrom(
          this.httpService.delete(revokeUrl, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/vnd.github.v3+json',
              Authorization:
                'Basic ' +
                Buffer.from(
                  `${this.configService.get<string>('GITHUB_CLIENT_ID')}:${this.configService.get<string>('GITHUB_CLIENT_SECRET')}`,
                ).toString('base64'),
            },
            data: {
              access_token: socialToken,
            },
          }),
        );
      } catch (revokeError) {
        this.logger.error(revokeError);
      }
    }
    await this.usersService.deleteUser(userId, res);
    await this.redisService.del(String(userId));
  }

  // 조회한 유저정보가 없다면 생성하는 메서드
  private async findOrCreateUser(
    provider: string,
    providerId: string,
    name: string,
    email: string,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    // 기존 유저 정보 조회
    const existingUser = await txOrPrisma.user.findUnique({
      where: { providerId },
    });

    if (existingUser) return existingUser;

    // 유저 정보 생성
    return await this.usersService.createUser(
      provider,
      providerId,
      name,
      email,
      txOrPrisma,
    );
  }

  // 소셜 토큰 저장 함수
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
