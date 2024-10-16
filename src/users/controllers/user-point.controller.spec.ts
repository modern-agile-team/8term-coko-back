import { Test, TestingModule } from '@nestjs/testing';
import { PointsController } from './user-point.controller';
import { PointsService } from '../services/user-point.service';

describe('PointsController', () => {
  let controller: PointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsController],
      providers: [PointsService],
    }).compile();

    controller = module.get<PointsController>(PointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
