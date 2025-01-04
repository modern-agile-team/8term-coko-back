import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserHpService } from '../services/user-hp.service';
import { UpdateHpDto } from '../dtos/update-hp.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';

@ApiTags('user-hp')
@Controller('userss/user-hp')
export class UserHpController {
  constructor(private readonly userHpService: UserHpService) {}

  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async getUserHp(@User() user: any) {
    return this.userHpService.findUserHpByUserId(user.id);
  }

  @Patch()
  @UseGuards(AuthGuard('accessToken'))
  async updateUserHp(@User() user: any, @Body() body: UpdateHpDto) {
    return this.userHpService.updateUserHpByUserId(user.id, body);
  }
}
