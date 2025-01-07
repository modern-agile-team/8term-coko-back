import { Test, TestingModule } from '@nestjs/testing';
import { UserHpService } from './user-hp.service';

describe('UserHpService', () => {
  let service: UserHpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHpService],
    }).compile();

    service = module.get<UserHpService>(UserHpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
