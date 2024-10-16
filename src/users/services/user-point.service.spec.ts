import { Test, TestingModule } from '@nestjs/testing';
import { UserPointService } from './user-point.service';

describe('PointService', () => {
  let service: UserPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPointService],
    }).compile();

    service = module.get<UserPointService>(UserPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
