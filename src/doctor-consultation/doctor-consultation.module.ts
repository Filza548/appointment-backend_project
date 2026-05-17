import { Module } from '@nestjs/common';
import { DoctorConsultationController } from './doctor-consultation.controller';
import { DoctorConsultationService } from './doctor-consultation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorConsultation } from './doctorconsultation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorConsultation])],
  controllers: [DoctorConsultationController],
  providers: [DoctorConsultationService]
})
export class DoctorConsultationModule {}
