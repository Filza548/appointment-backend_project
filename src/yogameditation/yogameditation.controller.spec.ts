import { Test, TestingModule } from '@nestjs/testing';
import { YogameditationController } from './yogameditation.controller';

describe('YogameditationController', () => {
  let controller: YogameditationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YogameditationController],
    }).compile();

    controller = module.get<YogameditationController>(YogameditationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
