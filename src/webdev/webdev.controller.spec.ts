import { Test, TestingModule } from '@nestjs/testing';
import { WebdevController } from './webdev.controller';

describe('WebdevController', () => {
  let controller: WebdevController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebdevController],
    }).compile();

    controller = module.get<WebdevController>(WebdevController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
