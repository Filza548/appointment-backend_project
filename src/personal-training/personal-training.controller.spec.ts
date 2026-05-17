import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTrainingController } from './personal-training.controller';

describe('PersonalTrainingController', () => {
  let controller: PersonalTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalTrainingController],
    }).compile();

    controller = module.get<PersonalTrainingController>(PersonalTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
