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
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: this.configService.get<number>('ACCESS_EXPIRATION_TIME'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: this.configService.get<number>('REFRESH_EXPIRATION_TIME'),
    });

    return { accessToken, refreshToken };
  }
}
