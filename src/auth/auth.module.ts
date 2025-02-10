import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google/google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { RedisModule } from './redis/redis.module';
import { CookieService } from './services/cookie.service';
import {
  AccessTokenStrategy,
  AdminAccessTokenStrategy,
  RefreshTokenStrategy,
} from './jwt/jwt.startegy';
import { UsersCoreModule } from 'src/users/modules/users-core.module';
import { KakaoStrategy } from './kakao/kakao.startegy';
import { GithubStrategy } from './github/github.strategy';

@Module({
  imports: [PassportModule, JwtModule, RedisModule, UsersCoreModule],
  providers: [
    AuthService,
    TokenService,
    CookieService,
    GoogleStrategy,
    KakaoStrategy,
    GithubStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AdminAccessTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [
    TokenService,
    CookieService,
    AccessTokenStrategy,
    AdminAccessTokenStrategy,
  ],
})
export class AuthModule {}
