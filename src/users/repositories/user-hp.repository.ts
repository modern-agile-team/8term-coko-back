import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateHpDto } from '../dtos/update-hp.dto';

@Injectable()
export class UserHpRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserHpByUserId(userId: number) {
    return this.prisma.userHp.findUnique({
      where: { userId },
    });
  }
  async updateUserHpByUserId(userId: number, data: UpdateHpDto) {
    return this.prisma.userHp.update({
      where: { userId },
      data,
    });
  }
}
