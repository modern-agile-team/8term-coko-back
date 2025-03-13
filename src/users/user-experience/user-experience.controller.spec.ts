import { Test, TestingModule } from '@nestjs/testing';
import { UserExperienceController } from './user-experience.controller';
import { UserExperienceService } from './user-experience.service';

describe('UserExperienceController', () => {
  let controller: UserExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExperienceController],
      providers: [UserExperienceService],
    }).compile();

    controller = module.get<UserExperienceController>(UserExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
