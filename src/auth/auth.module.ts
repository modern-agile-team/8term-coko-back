import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
/**
 * @todo part-progress의 import가 auth에서 하는건 이상한거 같아요
 * 유저생성을 auth에서 하고 있어서 어쩔수 없이 요기에 연결하는데, 나중에 usersService에서
 * 유저생성 메소드를 작성하고 part-progress를 userModule에서 불러 오도록 하면 어떨까 싶네요.
 */
import { PartProgressModule } from 'src/part-progress/part-progress.module';

@Module({
  imports: [
    PartProgressModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory(configservice: ConfigService) {
        return {
          secret: configservice.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configservice.get<number>('ACCESS_EXPIRATION_TIME'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
