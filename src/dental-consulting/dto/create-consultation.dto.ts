import { IsString, IsInt, IsOptional, IsEmail, IsBoolean, IsDate, Min, Max, Length,Matches
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsultationDto {
  @IsString()
  @Length(2, 100)
  patientName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @Length(1, 10)
  @Matches(/^(Male|Female|Other)$/)
  gender: string;

  @IsString()
  @Length(10, 15)
  @Matches(/^[0-9+\-\s]+$/)
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  // @IsOptional()
  @IsString()
  @Length(2, 50)
  address: string;

  @IsString()
  @Length(5, 500)
  symptoms: string;

  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  currentMedications?: string;

  @IsBoolean()
  isFirstVisit: boolean;

  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @IsOptional()
  @IsString()
  dentalHistory?: string;

  @IsOptional()
  @IsString()
  oralExamination?: string;

  @IsString()
  @Length(2, 100)
  doctorName: string;

  @IsString()
  @Length(2, 100)
  specialization: string;

  @Type(() => Date)
  @IsDate()
  appointmentDate: Date;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  appointmentTime: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  treatmentPlan?: string;

  @IsOptional()
  @IsString()
  prescription?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  nextAppointmentDate?: Date;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  nextAppointmentTime?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}