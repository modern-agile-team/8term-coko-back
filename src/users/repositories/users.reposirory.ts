import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(userId: number) {
    const userInfo = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return userInfo;
  }
}
