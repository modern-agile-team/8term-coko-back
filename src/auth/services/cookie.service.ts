import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private configService: ConfigService) {}

  async cookieResponse(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    // 쿠키와 리다이렉트의 설정은 클라이언트가 원하는 곳으로 지정해준다.
    // res.cookie 의 domain부분과 res.redirect의 url부분의 도메인을 일치시켜야 한다.
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none' as 'none', // none 타입으로 지정해줘야 함.
      maxAge: this.configService.get<number>('COOKIE_EXPIRATION'),
    };

    // access 와 refresh 토큰 옵션 설정
    const cookies = [
      {
        name: 'accessToken',
        value: accessToken,
        options: { ...cookieOptions },
      },
      {
        name: 'refreshToken',
        value: refreshToken,
        options: { ...cookieOptions }, // path 추가 예정
      },
    ];

    // 쿠키 설정
    for (const cookie of cookies) {
      res.cookie(cookie.name, cookie.value, cookie.options);
    }

    // 메인페이지로 리다이렉트 // 필요시 분리 가능
    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  async deleteCookie(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}
