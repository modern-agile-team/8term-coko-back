import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';

@Controller('daily-quests')
export class DailyQuestsController {
  constructor(private readonly dailyQuestsService: DailyQuestsService) {}

  @Get()
  findAll() {
    return this.dailyQuestsService.findAll();
  }

  @Get(':questId')
  findOne(@Param('questId', PositiveIntPipe) questId: number) {
    return this.dailyQuestsService.findOne(questId);
  }

  @Post()
  create(@Body() body: CreateDailyQuestDto) {
    return this.dailyQuestsService.create(body);
  }

  @Patch(':questId')
  update(
    @Param('questId', PositiveIntPipe) questId: number,
    @Body() body: UpdateDailyQuestDto,
  ) {
    return this.dailyQuestsService.update(questId, body);
  }

  @Delete(':questId')
  remove(@Param('questId', PositiveIntPipe) questId: number) {
    return this.dailyQuestsService.remove(questId);
  }
}
