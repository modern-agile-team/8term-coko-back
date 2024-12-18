import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // ? 옵셔널 을 붙여준 이유는 request 나 cookies 에 값이 없을때
          // null 을 반환하여 서버 종료를 방지하기 위함
          return request?.cookies?.accessToken || null;
        },
      ]),
      // 키를 넣어주지 않음으로 자동 검증 비활성화 -> validate에서 검증
      secretOrKey: configService.get<string>('ACCESS_SECRET'),
      // validate 메서드로 request 객체 전달
      passReqToCallback: true,
      ignoreExpiration: true,
    });
  }

  async validate(request: Request): Promise<any> {
    const accessToken = request?.cookies?.accessToken;
    const refreshToken = request?.cookies?.refreshToken;

    // accessToken 검증 단계
    try {
      // 토큰이 있는지 검사
      if (!accessToken) {
        throw new UnauthorizedException('No Access Token provided');
      }

      // 토큰 변조, 만료를 검사
      const payload = jwt.verify(
        accessToken,
        this.configService.get<string>('ACCESS_SECRET'),
      ) as any;

      const { userId } = payload;
      const user = await this.usersService.getUser(userId);

      return user;

      // refreshToken 검증 시작작
    } catch (error) {
      // 토큰이 있는지 검사
      if (!refreshToken)
        throw new UnauthorizedException('No Refresh Token provided');

      try {
        // refreshToken 검증
        const refreshPayload = jwt.verify(
          refreshToken,
          this.configService.get<string>('REFRESH_SECRET'),
        ) as any;

        const { userId } = refreshPayload;

        // redis에서 refreshToken 이 있는지 검사
        const redisRefreshToken = await this.redisService.get(userId);
        if (!redisRefreshToken || redisRefreshToken !== refreshToken) {
          throw new UnauthorizedException('Invalid Refresh Token');
        }

        // accessToken 재발급 및 쿠키에 담기기
        const newAccessToken = this.NewAccessToken(userId);
        this.setAccessTokenCookie(request, newAccessToken);

        // user 정보가져오기기
        const user = await this.usersService.getUser(userId);
        if (!user) throw new UnauthorizedException('User not found');

        return user;
      } catch (refreshError) {
        throw new UnauthorizedException('Invalid or Expired Refresh Token');
      }
    }
  }

  // accessToken 재발급
  private NewAccessToken(userId: string): string {
    return jwt.sign(
      { payload: userId },
      this.configService.get<string>('ACCESS_SECRET'),
      { expiresIn: this.configService.get<number>('ACCESS_EXPIRATION_TIME') },
    );
  }

  // accessToken을 쿠키 헤더에 포함
  private setAccessTokenCookie(request: Request, accessToken: string): void {
    request.res?.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none',
      maxAge: this.configService.get<number>('COOKIE_EXPIRATION'),
    });
  }
}
