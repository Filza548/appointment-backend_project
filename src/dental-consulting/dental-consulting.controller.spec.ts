import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationController } from './dental-consulting.controller';

describe('DentalConsultationController', () => {
  let controller: ConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationController],
    }).compile();

    controller = module.get<ConsultationController>(ConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
