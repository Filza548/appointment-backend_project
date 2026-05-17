import { Module } from '@nestjs/common';
import { SalonSpaConsultationService } from './salonspa.service';
import { SalonSpaConsultationController } from './salonspa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonSpaConsultation } from './salonspa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalonSpaConsultation])],
  controllers: [SalonSpaConsultationController],
  providers: [SalonSpaConsultationService],
  exports: [SalonSpaConsultationService],
})
export class SalonspaModule {}
