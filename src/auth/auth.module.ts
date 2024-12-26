import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'src/users/modules/users.module';
import { RedisModule } from './redis/redis.module';
import { JwtGuard } from './jwt/jwt.guard';
import { CookieService } from './services/cookie.service';

@Module({
  imports: [PassportModule, JwtModule, UsersModule, RedisModule],
  providers: [
    AuthService,
    TokenService,
    CookieService,
    GoogleStrategy,
    JwtStrategy,
    JwtGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
