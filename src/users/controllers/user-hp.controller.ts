import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { UserHpService } from '../services/user-hp.service';
import { UpdateHpDto } from '../dtos/update-hp.dto';

@ApiTags('hp')
@Controller('users/:userId/user-hp')
export class UserHpController {
  constructor(private readonly userHpService: UserHpService) {}

  @Get()
  async getUserHp(@Param('userId', PositiveIntPipe) userId: number) {
    return this.userHpService.findUserHpByUserId(userId);
  }

  @Patch()
  async updateUserHp(
    @Param('userId', PositiveIntPipe) userId: number,
    @Body() body: UpdateHpDto,
  ) {
    return this.userHpService.updateUserHpByUserId(userId, body);
  }
}
