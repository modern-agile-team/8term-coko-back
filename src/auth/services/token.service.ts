import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 액세스 토큰 생성
  async createAccessToken(userId: number): Promise<string> {
    const payload = { userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: Number(
        this.configService.get<string>('ACCESS_EXPIRATION_TIME'),
      ),
    });

    return accessToken;
  }

  // 리프레쉬 토큰 생성
  async createRefreshToken(userId: number): Promise<string> {
    const payload = { userId };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: Number(
        this.configService.get<string>('REFRESH_EXPIRATION_TIME'),
      ),
    });

    return refreshToken;
  }

  // 액세스 토큰 생성
  async createAdminAccessToken(role: string): Promise<string> {
    const payload = { role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ADMIN_ACCESS_SECRET'),
      expiresIn: Number(
        this.configService.get<string>('ADMIN_ACCESS_EXPIRATION_TIME'),
      ),
    });

    return accessToken;
  }

  // 토큰 조회
  async getMyToken(userId: number) {
    const tokenInfo = await this.prisma.token.findUnique({ where: { userId } });

    return tokenInfo;
  }
}
