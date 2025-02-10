import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { socialUserInfoDto } from '../dtos/social-user-info.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL'),
      scope: ['profile_nickname', 'account_email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { username, provider, id } = profile;

    // profile._json 내 properties.nickname 값이 존재하면 우선 사용, 없으면 username 사용
    const nickname = profile._json?.properties?.nickname || username;

    const user: any = {
      name: nickname,
      socialAccessToken: accessToken,
      socialRefreshToken: refreshToken || null,
      provider,
      providerId: id,
    };

    // user로 들어간 데이터를 dto 객체에 맞게 변경시켜줌
    const kakaoUser = plainToInstance(socialUserInfoDto, user);
    // dto에 지정한 타입을 만족하는지 검사 ( 메모리에 메타데이터로 dto 정보가 저장되어 있음 )
    const errors = validateSync(kakaoUser);

    if (errors.length > 0) {
      return done(new BadRequestException(errors), null);
    }

    done(null, kakaoUser);
  }
}
