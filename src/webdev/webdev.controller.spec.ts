import { Test, TestingModule } from '@nestjs/testing';
import { WebDevProjectController } from './webdev.controller';

describe('WebDevProjectController', () => {
  let controller: WebDevProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebDevProjectController],
    }).compile();

    controller = module.get<WebDevProjectController>(WebDevProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
