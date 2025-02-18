import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserHpService } from '../services/user-hp.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { ResUserHpDto } from '../dtos/res-user-hp.dto';
import { ApiUserHp } from '../swaggers/user-hp.swagger';
import { UserInfo } from '../entities/user.entity';

@ApiTags('users')
@Controller('users/me/hp')
export class UserHpController {
  constructor(private readonly userHpService: UserHpService) {}

  /**
   * userHp 조회 메서드
   * @param user
   * @returns
   */
  @ApiUserHp.getUserHp()
  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async getUserHp(@User() user: UserInfo): Promise<ResUserHpDto> {
    const userHp = await this.userHpService.getUserHpByUserId(user.id);
    return new ResUserHpDto(userHp);
  }

  /**
   * 유저 hp 감소
   * @param user
   * @returns
   */
  @ApiUserHp.dcreaseUserHp()
  @Patch()
  @UseGuards(AuthGuard('accessToken'))
  async decreaseUserHp(@User() user: UserInfo): Promise<ResUserHpDto> {
    const userHp = await this.userHpService.decreaseUserHpByUserId(user.id);
    return new ResUserHpDto(userHp);
  }
}
