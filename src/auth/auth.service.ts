// auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async googleLogin(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // if (this.prisma.user.findUnique(user.id)) {
    //   throw new ConflictException('User with this id already exists.');
    // }
    // const createdUserId = await this.prisma.user.create(usrer.id: CeateUserDto);

    const payload = { userEmail: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { payload },
      { expiresIn: '30d' },
    );
    return { accessToken, refreshToken };
  }
}
