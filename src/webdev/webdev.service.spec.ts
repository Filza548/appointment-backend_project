import { Test, TestingModule } from '@nestjs/testing';
import { WebDevProjectService } from './webdev.service';

describe('WebDevProjectService', () => {
  let service: WebDevProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebDevProjectService],
    }).compile();

    service = module.get<WebDevProjectService>(WebDevProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
