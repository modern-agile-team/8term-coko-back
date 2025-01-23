import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { ResDailyQuestDto } from './dto/res-daily-quest.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDailyQuest } from './daily-quest.swagger';

@ApiTags('daily-quests')
@Controller('daily-quests')
export class DailyQuestsController {
  constructor(private readonly dailyQuestsService: DailyQuestsService) {}

  @Get()
  @ApiDailyQuest.findAll()
  async findAll() {
    const dailyQuests = await this.dailyQuestsService.findAll();
    return ResDailyQuestDto.fromArray(dailyQuests);
  }

  @Get(':questId')
  @ApiDailyQuest.findOne()
  async findOne(@Param('questId', PositiveIntPipe) questId: number) {
    const dailyQuest = await this.dailyQuestsService.findOne(questId);
    return new ResDailyQuestDto(dailyQuest);
  }

  @Post()
  @ApiDailyQuest.create()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() body: CreateDailyQuestDto) {
    await this.dailyQuestsService.create(body);
  }

  @Patch(':questId')
  @ApiDailyQuest.update()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async update(
    @Param('questId', PositiveIntPipe) questId: number,
    @Body() body: UpdateDailyQuestDto,
  ) {
    await this.dailyQuestsService.update(questId, body);
  }

  @Delete(':questId')
  @ApiDailyQuest.remove()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async remove(@Param('questId', PositiveIntPipe) questId: number) {
    await this.dailyQuestsService.remove(questId);
  }
}
