import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configservice: ConfigService,
  ) {}

  async googleLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { provider, providerId, email, name, socialAccessToken } = user;

    //유저정보가 있다면
    const userInfo = await this.prisma.user.findUnique({
      where: { providerId },
    });
    if (userInfo) {
      await this.saveSocialToken(socialAccessToken, userInfo.id);

      return this.createJWT(userInfo.id, email);
    }

    //유저정보가 없다면
    const createdUserId = await this.prisma.user.create({
      data: { provider, providerId, name },
    });
    await this.saveSocialToken(socialAccessToken, createdUserId.id);

    return this.createJWT(createdUserId.id, email);
  }

  //jwt 발급
  private createJWT(userId: number, userEmail: string) {
    const payload = { userId, userEmail };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configservice.get<string>('REFRESH_EXPIRATION_TIME'),
    });

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
