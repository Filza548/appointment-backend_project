import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YogaMeditationService } from './yogameditation.service';
import { YogaMeditation } from './Yogameditation.entity';
import { YogaMeditationController } from './yogameditation.controller';

@Module({
    imports: [TypeOrmModule.forFeature([YogaMeditation])],
      controllers: [YogaMeditationController],
      providers: [YogaMeditationService],
      exports: [YogaMeditationService],
})
export class YogameditationModule {}
