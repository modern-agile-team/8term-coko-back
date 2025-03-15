import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SocialUserInfoDto } from '../dtos/social-user-info.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { displayName, provider, id } = profile;
    const email = profile.emails[0]?.value;
    console.log(profile);

    const user: SocialUserInfoDto = {
      name: displayName,
      socialAccessToken: accessToken,
      socialRefreshToken: refreshToken || null,
      provider,
      providerId: id,
      email,
    };

    // user로 들어간 데이터를 dto 객체에 맞게 변경시켜줌
    const googleUser = plainToInstance(SocialUserInfoDto, user);
    // dto에 지정한 타입을 만족하는지 검사
    const errors = validateSync(googleUser);

    if (errors.length > 0) {
      return done(new BadRequestException(errors), null);
    }

    done(null, googleUser);
  }
}
