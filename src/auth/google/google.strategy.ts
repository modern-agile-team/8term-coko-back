import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleUserDto } from './google-user.dto';
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

    const user: GoogleUserDto = {
      name: displayName,
      socialAccessToken: accessToken,
      socialRefreshToken: refreshToken || null,
      provider,
      providerId: id,
    };

    const googleUserDto = plainToInstance(GoogleUserDto, user);
    const errors = validateSync(googleUserDto);

    if (errors.length > 0) {
      return done(new BadRequestException(errors), null);
    }

    done(null, googleUserDto);
  }
}
