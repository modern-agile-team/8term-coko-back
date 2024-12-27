import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private userService: UsersService,
  ) {}

  async googleLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { provider, providerId, name, socialAccessToken } = user;

    // 유저 정보 조회 및 생성성
    const userInfo = await this.findOrCreateUser(provider, providerId, name);

    // 소셜 토큰 저장장
    await this.saveSocialToken(socialAccessToken, userInfo.id);

    const accessToken = await this.tokenService.createAccessToken(userInfo.id);
    const refreshToken = await this.tokenService.createRefreshToken(
      userInfo.id,
    );

    return { accessToken, refreshToken };
  }

  private async findOrCreateUser(
    provider: string,
    providerId: string,
    name: string,
  ) {
    try {
      // 기존 유저 정보 조회
      const existingUser = await this.prisma.user.findUnique({
        where: { providerId },
      });

      if (existingUser) return existingUser;

      // 유저 정보 생성
      return await this.userService.createUser(provider, providerId, name);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create');
    }
  }

  // 소셜 토큰 저장
  private saveSocialToken(socialAccessToken: string, userId: number) {
    return this.prisma.token.upsert({
      where: { userId },
      create: { socialAccessToken, userId },
      update: { socialAccessToken },
    });
  }
}
