import { Test, TestingModule } from '@nestjs/testing';
import { DoctorConsultationController } from './doctor-consultation.controller';

describe('DoctorConsultationController', () => {
  let controller: DoctorConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorConsultationController],
    }).compile();

    controller = module.get<DoctorConsultationController>(DoctorConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
