import { Test, TestingModule } from '@nestjs/testing';
import { DailyQuestsService } from './daily-quests.service';

describe('DailyQuestsService', () => {
  let service: DailyQuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyQuestsService],
    }).compile();

    service = module.get<DailyQuestsService>(DailyQuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
