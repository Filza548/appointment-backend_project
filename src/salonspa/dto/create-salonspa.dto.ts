import { 
  IsString, IsInt, IsOptional, IsEmail, IsBoolean, IsDate, 
  Min, Max, IsDecimal, Length, Matches,
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalonSpaConsultationDto {

  // ==================== CUSTOMER INFORMATION ====================

  @IsString()
  @Length(2, 100)
  customerName: string;

  @IsString()
  @Length(10, 15)
  @Matches(/^[0-9+\-\s]+$/)
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  // ==================== SERVICE DETAILS ====================

  @IsString()
  @Matches(/^(Salon|Spa|Both)$/)
  serviceType: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  hairService?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  nailService?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  spaService?: string;

  @IsOptional()
  @IsString()
  serviceNotes?: string;

  // ==================== APPOINTMENT DETAILS ====================

  @Type(() => Date)
  @IsDate()
  appointmentDate: Date;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  appointmentTime: string;

  @IsOptional()
  @IsInt()
  @Min(15)
  @Max(480)
  totalDuration?: number;

  // ==================== STAFF ====================

  @IsString()
  @Length(2, 100)
  staffName: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  staffSpecialization?: string;

  // ==================== MEMBERSHIP ====================

  @IsOptional()
  @IsBoolean()
  isMember?: boolean;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  membershipId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  loyaltyPoints?: number;

  // ==================== PAYMENT ====================

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsString()
  @Matches(/^(Pending|Paid|Refunded)$/)
  paymentStatus?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(Cash|Card|Online)$/)
  paymentMethod?: string;

  // ==================== STATUS ====================

  @IsOptional()
  @IsString()
  @Matches(/^(Scheduled|Confirmed|Completed|Cancelled|No-show)$/)
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}