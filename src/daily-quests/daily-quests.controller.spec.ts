import { Test, TestingModule } from '@nestjs/testing';
import { DailyQuestsController } from './daily-quests.controller';
import { DailyQuestsService } from './daily-quests.service';

describe('DailyQuestsController', () => {
  let controller: DailyQuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyQuestsController],
      providers: [DailyQuestsService],
    }).compile();

    controller = module.get<DailyQuestsController>(DailyQuestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
