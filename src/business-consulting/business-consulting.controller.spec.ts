import { Test, TestingModule } from '@nestjs/testing';
import { BusinessConsultationController } from './business-consulting.controller';

describe('BusinessConsultationController', () => {
  let controller: BusinessConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessConsultationController],
    }).compile();

    controller = module.get<BusinessConsultationController>(BusinessConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
