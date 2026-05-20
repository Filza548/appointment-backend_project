import { Test, TestingModule } from '@nestjs/testing';
import { YogaMeditationController } from './yogameditation.controller';

describe('YogaMeditationController', () => {
  let controller: YogaMeditationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YogaMeditationController],
    }).compile();

    controller = module.get<YogaMeditationController>(YogaMeditationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
