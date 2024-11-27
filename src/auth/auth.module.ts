import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory(configservice: ConfigService) {
        return {
          secret: configservice.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configservice.get<string>('ACCESS_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, GoogleStrategy, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
