import { Test, TestingModule } from '@nestjs/testing';
import { WebdevService } from './webdev.service';

describe('WebdevService', () => {
  let service: WebdevService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebdevService],
    }).compile();

    service = module.get<WebdevService>(WebdevService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
