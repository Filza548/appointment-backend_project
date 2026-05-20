import { Test, TestingModule } from '@nestjs/testing';
import { PlumbingServiceService } from './plumbingservices.service';

describe('PlumbingServiceService', () => {
  let service: PlumbingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlumbingServiceService],
    }).compile();

    service = module.get<PlumbingServiceService>(PlumbingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
