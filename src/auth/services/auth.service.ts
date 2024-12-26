import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async googleLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { provider, providerId, name, socialAccessToken } = user;

    let userInfo = await this.prisma.user.findUnique({
      where: { providerId },
    });

    //유저정보가 없다면
    if (!userInfo) {
      userInfo = await this.prisma.user.create({
        data: { provider, providerId, name },
      });
    }

    await this.saveSocialToken(socialAccessToken, userInfo.id);

    const accessToken = await this.tokenService.createAccessToken(userInfo.id);
    const refreshToken = await this.tokenService.createRefreshToken(
      userInfo.id,
    );

    return { accessToken, refreshToken };
  }

  //소셜토큰저장
  private saveSocialToken(socialAccessToken: string, userId: number) {
    return this.prisma.token.upsert({
      where: { userId },
      create: { socialAccessToken, userId },
      update: { socialAccessToken },
    });
  }
}
