import { Test, TestingModule } from '@nestjs/testing';
import { MakeUpService } from './make-up.service';

describe('MakeUpService', () => {
  let service: MakeUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakeUpService],
    }).compile();

    service = module.get<MakeUpService>(MakeUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
