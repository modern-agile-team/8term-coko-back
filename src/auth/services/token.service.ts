import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  // 액세스 토큰 생성
  async createAccessToken(userId: number): Promise<string> {
    const payload = { userId };

    try {
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
        expiresIn: this.configService.get<number>('ACCESS_EXPIRATION_TIME'),
      });

      return accessToken;
    } catch (accessError) {
      throw new InternalServerErrorException('Failed to create access token.');
    }
  }

  // 리프레쉬 토큰 생성
  async createRefreshToken(userId: number): Promise<string> {
    const payload = { userId };
    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: this.configService.get<number>('REFRESH_EXPIRATION_TIME'),
      });
      this.redisService.set(String(userId), refreshToken);

      return refreshToken;
    } catch (refreshError) {
      throw new InternalServerErrorException(
        'Failed to create refresh token or Fail to save in redis',
      );
    }
  }
}
