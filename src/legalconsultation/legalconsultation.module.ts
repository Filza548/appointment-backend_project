import { Module } from '@nestjs/common';
import { LegalConsultationService } from './legalconsultation.service';
import { LegalConsultationController } from './legalconsultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalConsultation } from './legalconsultation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LegalConsultation])],
  providers: [LegalConsultationService],
  controllers: [LegalConsultationController]
})
export class LegalconsultationModule {}
