import { Test, TestingModule } from '@nestjs/testing';
import { SalonspaController } from './salonspa.controller';

describe('SalonspaController', () => {
  let controller: SalonspaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalonspaController],
    }).compile();

    controller = module.get<SalonspaController>(SalonspaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
