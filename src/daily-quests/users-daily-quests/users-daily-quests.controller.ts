import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersDailyQuestsService } from './users-daily-quests.service';
import { UpdateUsersDailyQuestDto } from './dto/update-users-daily-quest.dto';
import { ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { ResUserDailyQuestDto } from './dto/res-user-daily-quest.dto';
import { ApiUserDailyQuest } from './users-daily-quest.swagger';

@ApiTags('user-quests')
@Controller('users/me/quests/daily')
export class UsersDailyQuestsController {
  constructor(
    private readonly usersDailyQuestsService: UsersDailyQuestsService,
  ) {}

  @Get()
  @ApiUserDailyQuest.findAll()
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo): Promise<ResUserDailyQuestDto[]> {
    const userDailyQuests = await this.usersDailyQuestsService.findAll(user.id);
    return ResUserDailyQuestDto.fromArray(userDailyQuests);
  }

  // @Patch(':userDailyQuestId')
  // @ApiUserDailyQuest.update()
  // @UseGuards(AuthGuard('accessToken'))
  // async update(
  //   @Param('userDailyQuestId', PositiveIntPipe) userDailyQuestId: number,
  //   @Body() body: UpdateUsersDailyQuestDto,
  // ): Promise<ResUserDailyQuestDto> {
  //   const userDailyQuest = await this.usersDailyQuestsService.update(
  //     userDailyQuestId,
  //     body,
  //   );
  //   return new ResUserDailyQuestDto(userDailyQuest);
  // }
}
