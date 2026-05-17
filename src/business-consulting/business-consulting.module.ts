// business-consultation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessConsultation } from './business-consulting.entity';
import { BusinessConsultationService } from './business-consulting.service';
import { BusinessConsultationController } from './business-consulting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessConsultation])],
  controllers: [BusinessConsultationController],
  providers: [BusinessConsultationService],
})
export class BusinessConsultationModule {}