import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { UserHp } from '../entities/user-hp.entity';
import { HP_DECREASE_VALUE } from '../constants/user-hp.constant';

@Injectable()
export class UserHpRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserHpByUserId(userId: number): Promise<UserHp> {
    return this.prisma.userHp.findUnique({
      where: { userId },
    });
  }

  async updateUserHpByUserId(
    userId: number,
    data: UpdateHpDto,
  ): Promise<UserHp> {
    return this.prisma.userHp.update({
      where: { userId },
      data,
    });
  }

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
