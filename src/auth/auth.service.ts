import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PartProgressService } from 'src/part-progress/part-progress.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configservice: ConfigService,
    private partProgressService: PartProgressService,
  ) {}

  async googleLogin(
    user: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { provider, providerId, email, name, socialAccessToken } = user;

    let userInfo = await this.prisma.user.findUnique({
      where: { providerId },
    });

    //유저정보가 없다면
    if (!userInfo) {
      userInfo = await this.prisma.user.create({
        data: { provider, providerId, name },
      });

      //유저 생성시 모든 디폴트 part-progress 생성
      await this.partProgressService.createAllDefaultByUserId(userInfo.id);
    }
    await this.saveSocialToken(socialAccessToken, userInfo.id);

    return this.createJWT(userInfo.id, email);
  }

  //jwt 발급
  private createJWT(userId: number, userEmail: string) {
    const payload = { userId, userEmail };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configservice.get<number>('REFRESH_EXPIRATION_TIME'),
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
