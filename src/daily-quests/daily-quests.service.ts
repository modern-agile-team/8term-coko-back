import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { DailyQuestsRepository } from './daily-quests.repository';

@Injectable()
export class DailyQuestsService {
  constructor(private readonly dailyQuestsRepository: DailyQuestsRepository) {}

  async findAll() {
    return this.dailyQuestsRepository.findAll();
  }

  async findOne(questId: number) {
    const dailyQuest = await this.dailyQuestsRepository.findOne(questId);

    if (!dailyQuest) {
      throw new NotFoundException(`일일퀘스트 ${questId}를 찾을 수 없습니다.`);
    }

    return dailyQuest;
  }

  async create(body: CreateDailyQuestDto) {
    return this.dailyQuestsRepository.create(body);
  }

  async update(questId: number, body: UpdateDailyQuestDto) {
    await this.findOne(questId);
    return this.dailyQuestsRepository.update(questId, body);
  }

  async remove(questId: number) {
    await this.findOne(questId);
    return this.dailyQuestsRepository.remove(questId);
  }
}
