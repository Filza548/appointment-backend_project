import { Test, TestingModule } from '@nestjs/testing';
import { SalonspaService } from './salonspa.service';

describe('SalonspaService', () => {
  let service: SalonspaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalonspaService],
    }).compile();

    service = module.get<SalonspaService>(SalonspaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
