// dto/response-business-consultation.dto.ts
import { Expose } from 'class-transformer';

export class ResponseBusinessConsultationDto {
  @Expose()
  id: number;

  @Expose()
  businessName: string;

  @Expose()
  ownerName: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  consultationType: string;

  @Expose()
  businessProblem: string;

  @Expose()
  status: string;

  @Expose()
  meetingDate: Date;

  @Expose()
  budget: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}