import { Injectable } from '@nestjs/common';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';

@Injectable()
export class DailyQuestsService {
  create(createDailyQuestDto: CreateDailyQuestDto) {
    return 'This action adds a new dailyQuest';
  }

  findAll() {
    return `This action returns all dailyQuests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyQuest`;
  }

  update(id: number, updateDailyQuestDto: UpdateDailyQuestDto) {
    return `This action updates a #${id} dailyQuest`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyQuest`;
  }
}
