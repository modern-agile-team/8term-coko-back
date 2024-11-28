import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configservice: ConfigService) {
    super({
      clientID: configservice.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configservice.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configservice.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { displayName, emails, photos, provider, id } = profile;

    const user = {
      email: emails[0].value,
      picture: photos[0].value,
      name: displayName,
      socialAccessToken: accessToken,
      socialRefeshToken: refreshToken || null,
      provider,
      providerId: id,
    };
    done(null, user);
  }
}
