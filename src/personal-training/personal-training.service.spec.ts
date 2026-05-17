import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTrainingService } from './personal-training.service';

describe('PersonalTrainingService', () => {
  let service: PersonalTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalTrainingService],
    }).compile();

    service = module.get<PersonalTrainingService>(PersonalTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
