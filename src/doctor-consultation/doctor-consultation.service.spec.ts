import { Test, TestingModule } from '@nestjs/testing';
import { DoctorConsultationService } from './doctor-consultation.service';

describe('DoctorConsultationService', () => {
  let service: DoctorConsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorConsultationService],
    }).compile();

    service = module.get<DoctorConsultationService>(DoctorConsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
