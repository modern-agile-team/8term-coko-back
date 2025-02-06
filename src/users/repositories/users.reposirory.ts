import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';
import { ATTENDANCE_INCREASE_VALUE } from '../constants/user-attendance.constant';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(userId: number) {
    const userInfo = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return userInfo;
  }

  async increaseUserTotalAttendance(
    userId: number,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    await txOrPrisma.user.update({
      where: { id: userId },
      data: { totalAttendance: { increment: ATTENDANCE_INCREASE_VALUE } },
    });
  }
}
