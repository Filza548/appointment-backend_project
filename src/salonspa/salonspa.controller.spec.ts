import { Test, TestingModule } from '@nestjs/testing';
import { SalonSpaConsultationController } from './salonspa.controller';

describe('SalonSpaConsultationController', () => {
  let controller: SalonSpaConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalonSpaConsultationController],
    }).compile();

    controller = module.get<SalonSpaConsultationController>(SalonSpaConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
