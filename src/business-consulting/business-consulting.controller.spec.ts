import { Test, TestingModule } from '@nestjs/testing';
import { BusinessConsultingController } from './business-consulting.controller';

describe('BusinessConsultingController', () => {
  let controller: BusinessConsultingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessConsultingController],
    }).compile();

    controller = module.get<BusinessConsultingController>(BusinessConsultingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
