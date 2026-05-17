import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalTraining } from './personal-training.entity';
import { PersonalTrainingService } from './personal-training.service';
import { PersonalTrainingController } from './personal-training.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalTraining])],
  controllers: [PersonalTrainingController],
  providers: [PersonalTrainingService],
  exports: [PersonalTrainingService],
})
export class PersonalTrainingModule {}