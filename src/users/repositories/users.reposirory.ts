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

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async deleteUserInfo(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  /**
   * 유저의 총 출석일 증가
   * @param userId
   * @param txOrPrisma
   */
  async increaseUserTotalAttendanceAndPoint(
    userId: number,
    attendanceRewardPoint: number,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    await txOrPrisma.user.update({
      where: { id: userId },
      data: {
        point: { increment: attendanceRewardPoint },
        totalAttendance: { increment: ATTENDANCE_INCREASE_VALUE },
      },
    });
  }

  /**
   * 유저의 총 정답수 업데이트
   * @param userId
   * @param totalCorrectAnswern
   * @param txOrPrisma
   */
  async updateUserTotalCorrectAnswer(
    userId: number,
    totalCorrectAnswer: number,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    await txOrPrisma.user.update({
      where: { id: userId },
      data: { totalCorrectAnswer },
    });
  }

  /**
   * 모든 유저의 id를 조회
   * @returns
   */
  async getAllUserIds(): Promise<{ id: number }[]> {
    const users = await this.prisma.user.findMany({
      select: { id: true },
    });

    return users;
  }
}
