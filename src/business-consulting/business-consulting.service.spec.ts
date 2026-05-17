import { Test, TestingModule } from '@nestjs/testing';
import { BusinessConsultationService } from './business-consulting.service';

describe('BusinessConsultingService', () => {
  let service: BusinessConsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessConsultationService],
    }).compile();

    service = module.get<BusinessConsultationService>(BusinessConsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
