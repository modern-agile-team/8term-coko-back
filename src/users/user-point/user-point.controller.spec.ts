import { Test, TestingModule } from '@nestjs/testing';
import { UserPointController } from './user-point.controller';
import { UserPointService } from './user-point.service';

describe('UserPointController', () => {
  let controller: UserPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPointController],
      providers: [UserPointService],
    }).compile();

    controller = module.get<UserPointController>(UserPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
