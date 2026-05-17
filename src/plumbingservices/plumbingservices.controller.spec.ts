import { Test, TestingModule } from '@nestjs/testing';
import { PlumbingservicesController } from './plumbingservices.controller';

describe('PlumbingservicesController', () => {
  let controller: PlumbingservicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlumbingservicesController],
    }).compile();

    controller = module.get<PlumbingservicesController>(PlumbingservicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
