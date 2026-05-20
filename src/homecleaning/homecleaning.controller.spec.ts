import { Test, TestingModule } from '@nestjs/testing';
import { HomeCleaningController } from './homecleaning.controller';

describe('HomeCleaningController', () => {
  let controller: HomeCleaningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCleaningController],
    }).compile();

    controller = module.get<HomeCleaningController>(HomeCleaningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
