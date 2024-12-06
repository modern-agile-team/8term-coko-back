import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [AuthService, GoogleStrategy, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
