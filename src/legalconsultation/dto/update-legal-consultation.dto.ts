// dto/update-legal-consultation.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalConsultationDto } from './createlega.dto';

export class UpdateLegalConsultationDto extends PartialType(CreateLegalConsultationDto) {}