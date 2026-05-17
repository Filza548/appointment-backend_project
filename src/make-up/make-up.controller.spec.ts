// import { Test, TestingModule } from '@nestjs/testing';
// import { MakeUpController } from './make-up.controller';

// describe('MakeUpController', () => {
//   let controller: MakeUpController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MakeUpController],
//     }).compile();

//     controller = module.get<MakeUpController>(MakeUpController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { MakeupBridalController } from './make-up.controller';
import { MakeupBridalService } from './make-up.service'; // ✅ service import karo

describe('MakeUpController', () => {
  let controller: MakeupBridalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakeupBridalController],
      providers: [MakeupBridalService], // ✅ yahan add karo
    }).compile();

    controller = module.get<MakeupBridalController>(MakeupBridalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});