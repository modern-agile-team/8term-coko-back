// auth/auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Google 로그인 시작
  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {
    // Google 로그인 페이지로 리다이렉션
  }

  // Google 로그인 콜백 처리
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLogin(@User() user: any) {
    // return {
    //   message: 'User information from Google',
    //   user,
    // };
    console.log(user);
    return this.authService.googleLogin(user);
  }
}
