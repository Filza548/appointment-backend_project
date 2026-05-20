import { Test, TestingModule } from '@nestjs/testing';
import { HomeCleaningService } from './homecleaning.service';

describe('HomeCleaningService', () => {
  let service: HomeCleaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeCleaningService],
    }).compile();

    service = module.get<HomeCleaningService>(HomeCleaningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
