import { Test, TestingModule } from '@nestjs/testing';
import { UserHpController } from './user-hp.controller';

describe('UserHpController', () => {
  let controller: UserHpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHpController],
    }).compile();

    controller = module.get<UserHpController>(UserHpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
