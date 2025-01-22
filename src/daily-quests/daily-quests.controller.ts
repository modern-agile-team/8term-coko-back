import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyQuestsService } from './daily-quests.service';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';

@Controller('daily-quests')
export class DailyQuestsController {
  constructor(private readonly dailyQuestsService: DailyQuestsService) {}

  @Post()
  create(@Body() createDailyQuestDto: CreateDailyQuestDto) {
    return this.dailyQuestsService.create(createDailyQuestDto);
  }

  @Get()
  findAll() {
    return this.dailyQuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyQuestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyQuestDto: UpdateDailyQuestDto) {
    return this.dailyQuestsService.update(+id, updateDailyQuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyQuestsService.remove(+id);
  }
}
