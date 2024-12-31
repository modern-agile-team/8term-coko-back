import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CookieService } from '../services/cookie.service';

// 필요하다면 redis나 cookie 상태 변경 로직은 분리 가능
@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly cookieService: CookieService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No Refresh Token provided');
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        this.configService.get<string>('REFRESH_SECRET'),
      ) as any;

      const { userId } = payload;

      // refresh 토큰이 유효하고 userId가 있다면 redis에서 토큰 삭제
      if (userId) {
        try {
          await this.redisService.del(userId);
        } catch (redisError) {
          throw new UnauthorizedException(
            'Failed to delete refreshToken in redis. Please try again.',
          );
        }
      }

      try {
        await this.cookieService.deleteCookie(response);
      } catch (cookieError) {
        throw new UnauthorizedException(
          'Failed to clear cookies. Please try again.',
        );
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Refresh Token');
    }

    return true;
  }
}
