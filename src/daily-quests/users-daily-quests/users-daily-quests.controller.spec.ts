import { Test, TestingModule } from '@nestjs/testing';
import { UsersDailyQuestsController } from './users-daily-quests.controller';
import { UsersDailyQuestsService } from './users-daily-quests.service';

describe('UsersDailyQuestsController', () => {
  let controller: UsersDailyQuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDailyQuestsController],
      providers: [UsersDailyQuestsService],
    }).compile();

    controller = module.get<UsersDailyQuestsController>(UsersDailyQuestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
