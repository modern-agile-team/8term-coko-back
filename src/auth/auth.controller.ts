// auth/auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  // Google 로그인 시작
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Google 로그인 페이지로 리다이렉션
  }

  // Google 로그인 콜백 처리
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@User() user: any) {
    console.log('컨트롤러 콜백 지나는 중');
    return {
      message: 'User information from Google',
      user,
    };
  }
}
