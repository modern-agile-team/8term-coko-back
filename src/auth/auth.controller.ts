import {
  Controller,
  Delete,
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
import { ConfigService } from '@nestjs/config';
import { SocialUserInfoDto } from './dtos/social-user-info.dto';
import { UserInfo } from 'src/users/users.entity';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ApiAuth } from './auth-swagger';
import { ResponseUserDto } from 'src/users/dtos/response-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Google 로그인
   */
  @Get('google')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  google() {}

  // Google 로그인 콜백 처리
  @Get('google/callback')
  @ApiExcludeEndpoint()
  @HttpCode(302)
  @UseGuards(AuthGuard('google'))
  async googleLogin(
    @User() user: SocialUserInfoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.socialLogin(user);

    await this.cookieService.cookieResponse(res, accessToken, refreshToken);

    // 메인페이지로 리다이렉트
    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  /**
   * Kakao 로그인
   */
  @Get('kakao')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('kakao'))
  kakao() {}

  // Kakao 로그인 콜백 처리
  @Get('kakao/callback')
  @ApiExcludeEndpoint()
  @HttpCode(302)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(
    @User() user: SocialUserInfoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.socialLogin(user);

    await this.cookieService.cookieResponse(res, accessToken, refreshToken);

    // 메인페이지로 리다이렉트
    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  /**
   * Github 로그인
   */
  @Get('github')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('github'))
  github() {}

  // Google 로그인 콜백 처리
  @Get('github/callback')
  @ApiExcludeEndpoint()
  @HttpCode(302)
  @UseGuards(AuthGuard('github'))
  async githubLogin(
    @User() user: SocialUserInfoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.socialLogin(user);

    await this.cookieService.cookieResponse(res, accessToken, refreshToken);

    // 메인페이지로 리다이렉트
    res.redirect(this.configService.get<string>('CLIENT_MAIN_PAGE_URL'));
  }

  // accessToken 검증 요청
  @ApiAuth.verify()
  @Get('verify')
  @HttpCode(200)
  @UseGuards(AuthGuard('accessToken'))
  async verifyToken(@User() user: UserInfo): Promise<ResponseUserDto> {
    return user;
  }

  // refreshToken을 검증하고 accessToken을 재발급
  @ApiAuth.newAccessToken()
  @Get('new-accessToken')
  @HttpCode(201)
  @UseGuards(AuthGuard('refreshToken'))
  async verifyRefresh(
    @User() user: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    // access 토큰 재발급
    const newAccessToken = await this.tokenService.createAccessToken(user.id);
    // 쿠키에 엑세스토큰 저장
    await this.cookieService.setAccessTokenCookie(res, newAccessToken);
  }

  // 로그아웃
  @ApiAuth.logout()
  @Post('logout')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async logout(
    @User() user: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.redisService.del(String(user.id));
    await this.cookieService.deleteCookie(res);
  }

  // 회원탈퇴
  @Delete('me')
  @ApiExcludeEndpoint()
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async withdraw(
    @User() user: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.withdraw(user.id, res);
    await this.cookieService.deleteCookie(res);
  }
}
