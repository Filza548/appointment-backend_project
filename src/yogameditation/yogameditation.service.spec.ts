import { Test, TestingModule } from '@nestjs/testing';
import { YogaMeditationService } from './yogameditation.service';

describe('YogaMeditationService', () => {
  let service: YogaMeditationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YogaMeditationService],
    }).compile();

    service = module.get<YogaMeditationService>(YogaMeditationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
