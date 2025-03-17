import { Test, TestingModule } from '@nestjs/testing';
import { UserExperienceService } from './user-experience.service';

describe('UserExperienceService', () => {
  let service: UserExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExperienceService],
    }).compile();

    service = module.get<UserExperienceService>(UserExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
