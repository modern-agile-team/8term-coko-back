import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './services/auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { CookieService } from './services/cookie.service';
import { LogoutGuard } from './guard/logout.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
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

    await this.cookieService.cookieResponse(res, accessToken, refreshToken);
  }

  // 로그아웃 처리
  @Post('/logout')
  @UseGuards(LogoutGuard)
  async logout() {}

  @Get('/verify')
  @UseGuards(JwtGuard)
  tokenVerify(@User() user: any) {
    return user;
  }
}
