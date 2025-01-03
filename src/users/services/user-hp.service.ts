import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserHpService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserHpByUserId(userId: number) {
    return;
  }
  async updateUserHpByUserId(userId: number, body: any) {
    return;
  }
}
