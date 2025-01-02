import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

// 쿠키와 리다이렉트의 설정은 클라이언트가 원하는 곳으로 지정해준다.
// res.cookie 의 domain부분과 res.redirect의 url부분의 도메인을 일치시켜야 한다.
@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  // accessToken 쿠키 설정
  async setAccessTokenCookie(res: Response, accessToken: string) {
    const accessTokenCookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none' as 'none', // none 타입으로 지정해줘야 함.
      maxAge: Number(
        this.configService.get<string>('ACCESS_COOKIE_EXPIRATION_TIME'),
      ),
      path: '/',
    };
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  }

  // refreshToken 쿠키 설정
  async setRefreshTokenCookie(res: Response, refreshToken: string) {
    const refreshTokenCookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none' as 'none',
      maxAge: Number(
        this.configService.get<string>('REFRESH_COOKIE_EXPIRATION_TIME'),
      ),
      path: '/', // refreshToken은 특정 경로로 제한 가능
    };
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
  }

  // access, refresh 쿠키 응답
  async cookieResponse(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    // accessToken 쿠키 설정
    await this.setAccessTokenCookie(res, accessToken);

    // refreshToken 쿠키 설정
    await this.setRefreshTokenCookie(res, refreshToken);

    // 메인페이지로 리다이렉트
    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  // 쿠키 삭제 (로그아웃시)
  async deleteCookie(res: Response) {
    const deleteCookieOptions = {
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none' as 'none',
      secure: true,
      path: '/',
    };

    res.clearCookie('accessToken', deleteCookieOptions);
    res.clearCookie('refreshToken', deleteCookieOptions);
  }
}
