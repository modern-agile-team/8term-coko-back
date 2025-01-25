import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyQuestDto } from './dto/create-daily-quest.dto';
import { UpdateDailyQuestDto } from './dto/update-daily-quest.dto';
import { DailyQuestsRepository } from './daily-quests.repository';
import { DailyQuest } from './daily-quests.interpace';

@Injectable()
export class DailyQuestsService {
  constructor(private readonly dailyQuestsRepository: DailyQuestsRepository) {}

  async findAll(): Promise<DailyQuest[]> {
    return this.dailyQuestsRepository.findAll();
  }

  async findOne(questId: number): Promise<DailyQuest> {
    const dailyQuest = await this.dailyQuestsRepository.findOne(questId);

    if (!dailyQuest) {
      throw new NotFoundException(`일일퀘스트 ${questId}를 찾을 수 없습니다.`);
    }

    return dailyQuest;
  }

  async create(body: CreateDailyQuestDto): Promise<DailyQuest> {
    return this.dailyQuestsRepository.create(body);
  }

  async update(
    questId: number,
    body: UpdateDailyQuestDto,
  ): Promise<DailyQuest> {
    await this.findOne(questId);
    return this.dailyQuestsRepository.update(questId, body);
  }

  async remove(questId: number): Promise<DailyQuest> {
    await this.findOne(questId);
    return this.dailyQuestsRepository.remove(questId);
  }
}
