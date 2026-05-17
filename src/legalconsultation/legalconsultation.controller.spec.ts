import { Test, TestingModule } from '@nestjs/testing';
import { LegalConsultationController } from './legalconsultation.controller';

describe('LegalConsultationController', () => {
  let controller: LegalConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegalConsultationController],
    }).compile();

    controller = module.get<LegalConsultationController>(LegalConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
