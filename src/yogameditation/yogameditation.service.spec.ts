import { Test, TestingModule } from '@nestjs/testing';
import { YogameditationService } from './yogameditation.service';

describe('YogameditationService', () => {
  let service: YogameditationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YogameditationService],
    }).compile();

    service = module.get<YogameditationService>(YogameditationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
