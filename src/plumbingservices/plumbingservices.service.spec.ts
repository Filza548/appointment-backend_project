import { Test, TestingModule } from '@nestjs/testing';
import { PlumbingservicesService } from './plumbingservices.service';

describe('PlumbingservicesService', () => {
  let service: PlumbingservicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlumbingservicesService],
    }).compile();

    service = module.get<PlumbingservicesService>(PlumbingservicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
