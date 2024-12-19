import { Test, TestingModule } from '@nestjs/testing';
import { PartProgressService } from './part-progress.service';

describe('PartProgressService', () => {
  let service: PartProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartProgressService],
    }).compile();

    service = module.get<PartProgressService>(PartProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
