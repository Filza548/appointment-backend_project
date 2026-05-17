import { Test, TestingModule } from '@nestjs/testing';
import { LegalConsultationService } from './legalconsultation.service';

describe('LegalconsultationService', () => {
  let service: LegalConsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalConsultationService],
    }).compile();

    service = module.get<LegalConsultationService>(LegalConsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
