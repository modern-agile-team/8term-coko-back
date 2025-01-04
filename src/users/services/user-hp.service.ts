import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserHpRepository } from '../repositories/user-hp.repository';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { UserHp } from '../entities/user-hp.entity';

@Injectable()
export class UserHpService {
  constructor(private readonly userHpRepository: UserHpRepository) {}

  async findUserHpByUserId(userId: number): Promise<UserHp> {
    const user = await this.userHpRepository.findUserHpByUserId(userId);

    if (!user) {
      throw new NotFoundException(`id ${userId} not found`);
    }

    return user;
  }
  async updateUserHpByUserId(
    userId: number,
    body: UpdateHpDto,
  ): Promise<UserHp> {
    const { hp } = body;
    const { hpStorage } = await this.findUserHpByUserId(userId);

    if (hp > hpStorage) {
      throw new BadRequestException(
        `hp(${hp})는 hpStorage(${hpStorage})보다 작아야 합니다.`,
      );
    }
    return this.userHpRepository.updateUserHpByUserId(userId, body);
  }
}
