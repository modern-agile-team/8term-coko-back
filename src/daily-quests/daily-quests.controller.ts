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

@ApiTags('quests')
@Controller('quests/daily')
export class DailyQuestsController {
  constructor(private readonly dailyQuestsService: DailyQuestsService) {}

  @Get()
  @ApiDailyQuest.findAll()
  async findAll(): Promise<ResDailyQuestDto[]> {
    const dailyQuests = await this.dailyQuestsService.findAll();
    return ResDailyQuestDto.fromArray(dailyQuests);
  }

  @Get(':questId')
  @ApiDailyQuest.findOne()
  async findOne(
    @Param('questId', PositiveIntPipe) questId: number,
  ): Promise<ResDailyQuestDto> {
    const dailyQuest = await this.dailyQuestsService.findOne(questId);
    return new ResDailyQuestDto(dailyQuest);
  }

  @Post()
  @ApiDailyQuest.create()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async create(@Body() body: CreateDailyQuestDto): Promise<void> {
    await this.dailyQuestsService.create(body);
  }

  @Patch(':questId')
  @ApiDailyQuest.update()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async update(
    @Param('questId', PositiveIntPipe) questId: number,
    @Body() body: UpdateDailyQuestDto,
  ): Promise<void> {
    await this.dailyQuestsService.update(questId, body);
  }

  @Delete(':questId')
  @ApiDailyQuest.remove()
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async remove(
    @Param('questId', PositiveIntPipe) questId: number,
  ): Promise<void> {
    await this.dailyQuestsService.remove(questId);
  }
}
