// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //   constructor(private jwtService: JwtService) {}

  async login(user: any) {
    // const payload = { username: user.email, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    console.log('auth 서비스단 지나는 중');
    return { message: 'Logged in without JWT', user };
  }
}
