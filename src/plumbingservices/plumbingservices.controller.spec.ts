import { Test, TestingModule } from '@nestjs/testing';
import { PlumbingServiceController } from './plumbingservices.controller';

describe('PlumbingServiceController', () => {
  let controller: PlumbingServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlumbingServiceController],
    }).compile();

    controller = module.get<PlumbingServiceController>(PlumbingServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
