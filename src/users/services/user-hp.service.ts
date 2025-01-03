import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHpRepository } from '../repositories/user-hp.repository';

@Injectable()
export class UserHpService {
  constructor(private readonly userHpRepository: UserHpRepository) {}

  async findUserHpByUserId(userId: number) {
    return this.userHpRepository.findUserHpByUserId(userId);
  }
  async updateUserHpByUserId(userId: number, body: any) {
    return this.userHpRepository.updateUserHpByUserId(userId, body);
  }
}
