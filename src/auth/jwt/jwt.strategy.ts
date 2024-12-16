import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';
import { JwtDto } from './jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      // Secret 키 확인
      secretOrKey: configService.get<string>('ACCESS_SECRET'),
      // access 토큰이 없다면 아래에서 401 반환
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // ? 옵셔널 을 붙여준 이유는 request 나 cookies 에 값이 없을때
          // 서버 종료를 방지하기 위함
          return request?.cookies?.accessToken || null;
        },
      ]),
      passReqToCallback: true,
      ignoreExpiration: true, // 시간 만료된 토큰은 validate로 넘김
    });
  }

  async validate(
    request: Request,
    payload: JwtDto,
    done: VerifiedCallback,
  ): Promise<any> {
    const { userId, exp } = payload;

    // 유효시간이 만료되었다면 refeshToken 검증
    if (exp * 1000 < Date.now()) {
      const newUser = await this.validateRefreshToken(request);
      if (newUser) return done(null, newUser);

      throw new UnauthorizedException('Refresh Token invalid or expired');
    }

    // 유효시간이 만료되지 않았다면
    try {
      const user = await this.usersService.getUser(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(); // 이외에 모두 error
    }
  }

  // refreshToken 검증 함수
  private async validateRefreshToken(request: Request): Promise<any> {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No Refresh Token provided');
    }

    // refreshToken이 있다면 검증시작
    try {
      const refreshPayload: any = jwt.verify(
        refreshToken,
        this.configService.get<string>('REFRESH_SECRET'),
      );

      const newAccessToken = this.NewAccessToken(refreshPayload.userId);
      this.setAccessTokenCookie(request, newAccessToken);

      const user = await this.usersService.getUser(refreshPayload.userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (refreshError) {
      throw new UnauthorizedException('Invalid Refresh Token');
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
