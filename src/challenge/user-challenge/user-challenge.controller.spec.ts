import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengeController } from './user-challenge.controller';
import { UserChallengeService } from './user-challenge.service';

describe('UserChallengeController', () => {
  let controller: UserChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChallengeController],
      providers: [UserChallengeService],
    }).compile();

    controller = module.get<UserChallengeController>(UserChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
