import { Test, TestingModule } from '@nestjs/testing';
import { UsersDailyQuestsService } from './users-daily-quests.service';

describe('UsersDailyQuestsService', () => {
  let service: UsersDailyQuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDailyQuestsService],
    }).compile();

    service = module.get<UsersDailyQuestsService>(UsersDailyQuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
