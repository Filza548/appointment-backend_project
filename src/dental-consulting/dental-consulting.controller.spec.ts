import { Test, TestingModule } from '@nestjs/testing';
import { DentalConsultingController } from './dental-consulting.controller';

describe('DentalConsultingController', () => {
  let controller: DentalConsultingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentalConsultingController],
    }).compile();

    controller = module.get<DentalConsultingController>(DentalConsultingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
