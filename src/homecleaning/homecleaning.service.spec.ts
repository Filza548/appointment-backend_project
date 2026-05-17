import { Test, TestingModule } from '@nestjs/testing';
import { HomecleaningService } from './homecleaning.service';

describe('HomecleaningService', () => {
  let service: HomecleaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomecleaningService],
    }).compile();

    service = module.get<HomecleaningService>(HomecleaningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
