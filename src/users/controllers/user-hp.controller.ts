import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { UserHpService } from '../services/user-hp.service';

@ApiTags('hp')
@Controller('users/:id/user-hp')
export class UserHpController {
  constructor(private readonly userHpService: UserHpService) {}

  @Get()
  getUserHp(@Param('id', PositiveIntPipe) userId: number) {
    return this.userHpService.findUserHpByUserId(userId);
  }

  @Patch()
  updateUserHp(
    @Param('id', PositiveIntPipe) userId: number,
    @Body() body: any,
  ) {
    return this.userHpService.updateUserHpByUserId(userId, body);
  }
}
