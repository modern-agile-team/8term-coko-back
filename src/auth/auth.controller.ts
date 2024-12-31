import {
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { Response } from 'express';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';
import { TokenService } from './services/token.service';
import { RedisService } from './redis/redis.service';
import { UsersService } from 'src/users/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
    private readonly userService: UsersService,
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

  // 로그아웃
  @Post('logout')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async logout(@User() user: any, @Res() res: Response) {
    await this.redisService.del(user.id);
    await this.cookieService.deleteCookie(res);
  }

  // jwt 검증 요청
  @Get('verify')
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async verifyToken(@User() user: any): Promise<any> {
    return user;
  }

  // refreshToken을 검증하고 accessToken을 재발급
  @Get('verify-refreshToken')
  @HttpCode(201)
  @UseGuards(AuthGuard('refreshToken'))
  async verifyRefresh(@User() user: any, @Res() res: Response): Promise<any> {
    // access 토큰 재발급
    const newAccessToken = await this.tokenService.createAccessToken(user.id);
    // 쿠키에 엑세스토큰 저장
    await this.cookieService.setAccessTokenCookie(res, newAccessToken);

    return user;
  }

  // admin 권한 확인
  @Get('admin')
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async verifyAdmin(@User() user: any): Promise<boolean> {
    const role = await this.userService.verifyAdmin(user.id);

    return role;
  }
}
