import { Test, TestingModule } from '@nestjs/testing';
import { PaginationServiceService } from './pagination.service';

describe('PaginationServiceService', () => {
  let service: PaginationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationServiceService],
    }).compile();

    service = module.get<PaginationServiceService>(PaginationServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
