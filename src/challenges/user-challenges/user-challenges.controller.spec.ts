import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengesController } from './user-challenges.controller';
import { UserChallengesService } from './user-challenges.service';

describe('UserChallengesController', () => {
  let controller: UserChallengesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChallengesController],
      providers: [UserChallengesService],
    }).compile();

    controller = module.get<UserChallengesController>(UserChallengesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
