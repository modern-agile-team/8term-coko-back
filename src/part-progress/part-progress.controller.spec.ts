import { Test, TestingModule } from '@nestjs/testing';
import { PartProgressController } from './part-progress.controller';
import { PartProgressService } from './part-progress.service';

describe('PartProgressController', () => {
  let controller: PartProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartProgressController],
      providers: [PartProgressService],
    }).compile();

    controller = module.get<PartProgressController>(PartProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
