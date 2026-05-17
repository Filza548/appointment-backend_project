import { Test, TestingModule } from '@nestjs/testing';
import { HomecleaningController } from './homecleaning.controller';

describe('HomecleaningController', () => {
  let controller: HomecleaningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomecleaningController],
    }).compile();

    controller = module.get<HomecleaningController>(HomecleaningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
