import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { RedisService } from '../redis/redis.service';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const accessToken = request?.cookies?.accessToken;
    const refreshToken = request?.cookies?.refreshToken;

    try {
      // access 토큰이 있는지 검사
      if (!accessToken) {
        throw new UnauthorizedException('No Access Token provided');
      }

      // access 토큰 변조, 만료를 검사
      const payload = jwt.verify(
        accessToken,
        this.configService.get<string>('ACCESS_SECRET'),
      ) as any;

      const { userId } = payload;
      const user = await this.usersService.getUser(userId);

      // 요청객체 user에 user 정보를 담음음
      request['user'] = user;

      // access 토큰이 잘 있다면 반환가능
      return true;
    } catch (error) {
      // refresh 토큰이 있는지 검사
      if (!refreshToken) {
        throw new UnauthorizedException('No Refresh Token provided');
      }

      try {
        // refresh 토큰 변조, 만료를 검사
        const payload = jwt.verify(
          refreshToken,
          this.configService.get<string>('REFRESH_SECRET'),
        ) as any;

        const { userId } = payload;

        // redis에 해당 refresh 토큰 있는지 확인인
        const redisRefreshToken = await this.redisService.get(userId);
        if (!redisRefreshToken || redisRefreshToken !== refreshToken) {
          throw new UnauthorizedException('Invalid Refresh Token');
        }

        // access 토큰 재발급 및 쿠키에 담기
        const newAccessToken = this.NewAccessToken(userId);
        this.setAccessTokenCookie(response, newAccessToken);

        const user = await this.usersService.getUser(userId);
        if (!user) throw new UnauthorizedException('User not found');

        request['user'] = user;
        return true;
      } catch (refreshError) {
        throw new UnauthorizedException('Invalid or Expired Refresh Token');
      }
    }
  }
  // access 토큰 재발급
  private NewAccessToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.configService.get<string>('ACCESS_SECRET'),
      { expiresIn: this.configService.get<number>('ACCESS_EXPIRATION_TIME') },
    );
  }

  // access 토큰을 쿠키에 설정
  private setAccessTokenCookie(response: Response, accessToken: string): void {
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none',
      maxAge: this.configService.get<number>('COOKIE_EXPIRATION'),
    });
  }
}
