import { Exclude, Expose } from 'class-transformer';

export class ResponseSalonSpaConsultationDto {

  @Expose()
  id: number;

  // ==================== CUSTOMER INFORMATION ====================

  @Expose()
  customerName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email?: string;

  // ==================== SERVICE DETAILS ====================

  @Expose()
  serviceType: string;

  @Expose()
  hairService?: string;

  @Expose()
  nailService?: string;

  @Expose()
  spaService?: string;

  @Expose()
  serviceNotes?: string;

  // ==================== APPOINTMENT DETAILS ====================

  @Expose()
  appointmentDate: Date;

  @Expose()
  appointmentTime: string;

  @Expose()
  totalDuration: number;

  // ==================== STAFF ====================

  @Expose()
  staffName: string;

  @Expose()
  staffSpecialization?: string;

  // ==================== MEMBERSHIP ====================

  @Expose()
  isMember: boolean;

  @Expose()
  membershipId?: string;

  @Expose()
  loyaltyPoints: number;

  // ==================== PAYMENT ====================

  @Expose()
  totalAmount: number;

  @Expose()
  paymentStatus: string;

  @Expose()
  paymentMethod?: string;

  // ==================== STATUS ====================

  @Expose()
  status: string;

  @Expose()
  notes?: string;

  // ==================== TIMESTAMPS ====================

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ResponseSalonSpaConsultationDto>) {
    Object.assign(this, partial);
  }
}