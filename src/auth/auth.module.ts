import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'src/users/modules/users.module';

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthService, TokenService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
