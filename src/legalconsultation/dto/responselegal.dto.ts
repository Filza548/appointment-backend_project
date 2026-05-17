// response-legal-consultation.dto.ts
import { Expose } from 'class-transformer';

export class ResponseLegalConsultationDto {
  @Expose()
  id: number;

  @Expose()
  clientName: string;

  @Expose()
  clientPhone: string;

  @Expose()
  clientEmail: string;

  @Expose()
  caseType: string;

  @Expose()
  description: string;

  @Expose()
  status: string;

  @Expose()
  consultationDate: Date;

  @Expose()
  fee: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}