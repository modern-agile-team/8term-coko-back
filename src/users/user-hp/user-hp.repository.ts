import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHp } from './user-hp.entity';
import { HP_DECREASE_VALUE } from './user-hp.constant';

@Injectable()
export class UserHpRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserHpByUserId(userId: number): Promise<UserHp> {
    return this.prisma.userHp.findUnique({
      where: { userId },
    });
  }

  // 추후 사용될 수도 있는 메서드
  // async updateUserHpByUserId(
  //   userId: number,
  //   data: UpdateHpDto,
  // ): Promise<UserHp> {
  //   return this.prisma.userHp.update({
  //     where: { userId },
  //     data,
  //   });
  // }

  /**
   * hp 감소 메서드
   * @param userId
   * @returns
   */
  async decreaseUserHpByUserId(userId: number): Promise<UserHp> {
    return this.prisma.userHp.update({
      where: { userId },
      data: { hp: { decrement: HP_DECREASE_VALUE } },
    });
  }

  /**
   * hp 리필 메서드
   * @param userId
   * @param hpRefillValue
   * @returns
   */
  async refillUserHpByUserId(
    userId: number,
    hpRefillValue: number,
  ): Promise<UserHp> {
    return this.prisma.userHp.update({
      where: { userId },
      data: { hp: { increment: hpRefillValue } },
    });
  }
}
