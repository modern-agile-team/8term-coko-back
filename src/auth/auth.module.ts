import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), // 구글을 기본 전략으로 등록
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60m' },
    // }),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  //   exports: [AuthService],
})
export class AuthModule {}
