import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserHpService } from '../services/user-hp.service';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { ResUserHpDto } from '../dtos/res-user-hp.dto';

@ApiTags('user-hp')
@Controller('users/user-hp')
export class UserHpController {
  constructor(private readonly userHpService: UserHpService) {}

  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async getUserHp(@User() user: any): Promise<ResUserHpDto> {
    const userHp = await this.userHpService.findUserHpByUserId(user.id);
    return new ResUserHpDto(userHp);
  }

  @Patch()
  @UseGuards(AuthGuard('accessToken'))
  async updateUserHp(
    @User() user: any,
    @Body() body: UpdateHpDto,
  ): Promise<ResUserHpDto> {
    const userHp = await this.userHpService.updateUserHpByUserId(user.id, body);
    return new ResUserHpDto(userHp);
  }
}
