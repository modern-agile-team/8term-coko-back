import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createJWT(userId: number, userEmail: string) {
    const payload = { userId, userEmail };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('REFRESH_EXPIRATION_TIME'),
    });

    return { accessToken, refreshToken };
  }
}
