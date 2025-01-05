import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserHpRepository } from '../repositories/user-hp.repository';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { UserHp } from '../entities/user-hp.entity';
import { HP_FULL_RECHARGE_TIME } from '../constants/user-experience.constant';

@Injectable()
export class UserHpService {
  constructor(private readonly userHpRepository: UserHpRepository) {}

  private async checkRefillTime({ updatedAt }: UserHp) {
    const lastUpdated = new Date(updatedAt);
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdated.getTime();

    if (timeDiff >= HP_FULL_RECHARGE_TIME) {
      return true;
    }

    return false;
  }

  async findUserHpByUserId(userId: number): Promise<UserHp> {
    const userHp = await this.userHpRepository.findUserHpByUserId(userId);

    if (!userHp) {
      throw new NotFoundException(`id ${userId}'s HP not found`);
    }

    // 생명력을 가득 채워야하는지 체크
    const chackRechargeHp = await this.checkRefillTime(userHp);

    // 채워야 하면
    if (chackRechargeHp) {
      // hp를 hpStorage만큼 채움
      const newBody: UpdateHpDto = { hp: userHp.hpStorage };
      return this.userHpRepository.updateUserHpByUserId(userId, newBody);
    }

    return userHp;
  }
  async updateUserHpByUserId(
    userId: number,
    body: UpdateHpDto,
  ): Promise<UserHp> {
    const { hp } = body;
    const userHp = await this.findUserHpByUserId(userId);
    const hpStorage = userHp.hpStorage;

    if (hp > hpStorage) {
      throw new BadRequestException(
        `hp(${hp})는 hpStorage(${hpStorage})보다 작아야 합니다.`,
      );
    }

    return this.userHpRepository.updateUserHpByUserId(userId, body);
  }
}
