import { Injectable } from '@nestjs/common';
import { UserHpRepository } from '../repositories/user-hp.repository';
import { UpdateHpDto } from '../dtos/update-hp.dto';

@Injectable()
export class UserHpService {
  constructor(private readonly userHpRepository: UserHpRepository) {}

  async findUserHpByUserId(userId: number) {
    return this.userHpRepository.findUserHpByUserId(userId);
  }
  async updateUserHpByUserId(userId: number, body: UpdateHpDto) {
    return this.userHpRepository.updateUserHpByUserId(userId, body);
  }
}
