import { Test, TestingModule } from '@nestjs/testing';
import { SalonSpaConsultationService } from './salonspa.service';

describe('SalonSpaConsultationService', () => {
  let service: SalonSpaConsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalonSpaConsultationService],
    }).compile();

    service = module.get<SalonSpaConsultationService>(SalonSpaConsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
