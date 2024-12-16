import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/modules/users.module';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // Google 로그인 시작
  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {}

  // Google 로그인 콜백 처리
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@User() user: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.googleLogin(user);

    // *쿠키 설정 옵션 분리예정
    // 쿠키와 리다이렉트의 설정은 클라이언트가 원하는 곳으로 지정해준다.
    // res.cookie 의 domain부분과 res.redirect의 url부분의 도메인을 일치시켜야 한다.
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      domain: this.configService.get<string>('COOKIE_DOMAIN'),
      sameSite: 'none' as 'none', // none 타입으로 지정해줘야 함.
      maxAge: this.configService.get<number>('COOKIE_EXPIRATION'),
    };

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

    for (const cookie of cookies) {
      res.cookie(cookie.name, cookie.value, cookie.options);
    }

    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  @Get('/verify')
  @UseGuards(AuthGuard('jwt'))
  authTest(@User() user: any) {
    return user;
  }
}
