import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { UserInfo } from 'src/users/entities/user.entity';
import { AdminTokenPayload, TokenPayload } from './jwt.interface';

// accessToken 전략
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // ? 옵셔널 을 붙여준 이유는 request 나 cookies 에 값이 없을때
          // null 을 반환하여 서버 종료를 방지하기 위함
          return request?.cookies?.accessToken || null;
        },
      ]),
      // 시크릿키로 검증

      secretOrKey: configService.get<string>('ACCESS_SECRET'),
      // validate 메서드로 request 객체 전달
      passReqToCallback: true,
      // 만료된 토큰도 검증
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: TokenPayload): Promise<UserInfo> {
    const user = await this.userService.getUser(payload.userId);

    return user;
  }
}

// refreshToken 전략
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // ? 옵셔널 을 붙여준 이유는 request 나 cookies 에 값이 없을때
          // null 을 반환하여 서버 종료를 방지하기 위함
          return request?.cookies?.refreshToken || null;
        },
      ]),
      // 시크릿키로 검증
      secretOrKey: configService.get<string>('REFRESH_SECRET'),
      // validate 메서드로 request 객체 전달
      passReqToCallback: true,
      // 만료된 토큰도 검증
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: TokenPayload): Promise<UserInfo> {
    const refreshToken = request?.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('No Refresh Token provided');
    }

    const redisRefreshToken = await this.redisService.get(
      String(payload.userId),
    );
    if (!redisRefreshToken) {
      throw new UnauthorizedException('Refresh Token not found');
    }

    // 요청받은 토큰과 redis의 토큰이 같은지 검사
    if (!redisRefreshToken || redisRefreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return await this.userService.getUser(payload.userId);
  }
}

// adminAccessToken 전략
@Injectable()
export class AdminAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'adminAccessToken',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // ? 옵셔널 을 붙여준 이유는 request 나 cookies 에 값이 없을때
          // null 을 반환하여 서버 종료를 방지하기 위함
          return request?.cookies?.accessToken || null;
        },
      ]),
      // 시크릿키로 검증

      secretOrKey: configService.get<string>('ADMIN_ACCESS_SECRET'),
      // validate 메서드로 request 객체 전달
      passReqToCallback: true,
      // 만료된 토큰도 검증
      ignoreExpiration: false,
    });
  }

  async validate(
    request: Request,
    payload: AdminTokenPayload,
  ): Promise<object> {
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('Invalid Access Token');
    }
    return { isAdmin: true };
  }
}
