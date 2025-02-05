import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersDailyQuestsService } from './users-daily-quests.service';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';

@ApiTags('quests')
@Controller('users/me/quests/daily')
export class UsersDailyQuestsController {
  constructor(
    private readonly usersDailyQuestsService: UsersDailyQuestsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo) {
    return this.usersDailyQuestsService.findAll(user.id);
  }

  @Patch(':userDailyQuestId')
  @UseGuards(AuthGuard('accessToken'))
  async update(
    @Param('userDailyQuestId', PositiveIntPipe) userDailyQuestId: number,
    @Body() body: UpdateUsersDailyQuestDto,
  ) {
    return this.usersDailyQuestsService.update(userDailyQuestId, body);
  }
}
