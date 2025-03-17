import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengesService } from './user-challenges.service';

describe('UserChallengesService', () => {
  let service: UserChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChallengesService],
    }).compile();

    service = module.get<UserChallengesService>(UserChallengesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
