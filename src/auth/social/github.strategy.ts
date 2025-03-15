import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SocialUserInfoDto } from '../dtos/social-user-info.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['read:user', 'user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { username, provider, id } = profile;

    // profile내 profile내 displayName 값이 존재하면 우선 사용, 없으면 username 사용
    const nickname = profile.displayName || username;
    const email = profile.emails?.[0]?.value;

    const user: SocialUserInfoDto = {
      name: nickname,
      socialAccessToken: accessToken,
      socialRefreshToken: refreshToken || null,
      provider,
      providerId: id,
      email,
    };

    // user로 들어간 데이터를 dto 객체에 맞게 변경시켜줌
    const githubUser = plainToInstance(SocialUserInfoDto, user);
    // dto에 지정한 타입을 만족하는지 검사 ( 메모리에 메타데이터로 dto 정보가 저장되어 있음 )
    const errors = validateSync(githubUser);

    if (errors.length > 0) {
      return done(new BadRequestException(errors), null);
    }

    done(null, githubUser);
  }
}
