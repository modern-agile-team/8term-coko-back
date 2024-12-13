import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      // Secret 키 확인
      secretOrKey: configService.get<string>('ACCESS_SECRET'),
      // BearerToken타입으로 넘어오는 토큰을 확인하겠다
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // payload 인터페이스 만들어야함
  async validate(payload, done: VerifiedCallback): Promise<any> {
    const { userId } = payload;

    // 따로 서비스를 만들지 않고 user서비스에서 getUser 메서드를 가져와 사용하는데
    // 이렇게 사용해도 될지? -> 왜냐하면 getUser메서드에서 사용자가 없다면
    // NotFoundException 을 던지기 때문에 아래 UnauthorizedException는 실행되지 않을 것이기 때문에..
    const user = await this.usersService.getUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return done(null, user);
  }
}
