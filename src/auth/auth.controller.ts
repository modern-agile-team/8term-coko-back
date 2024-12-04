import { Controller, Get, Redirect, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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
  googleLogin(@User() user: any, @Res() res: Response) {
    const jwtToken = this.authService.googleLogin(user);

    // 쿠키와 리다이렉트의 설정은 클라이언트가 원하는 곳으로 지정해준다.
    // res.cookie 의 domain부분과 res.redirect의 url부분의 도메인을 일치시켜야 한다.
    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      domain: 'cokoedu.com',
      // domain: 'localhost',
      sameSite: 'none',
      maxAge: 3600000,
    });

    res.redirect('https://cokoedu.com/learn');
    // res.redirect('http://localhost:3000/learn');
  }
}
