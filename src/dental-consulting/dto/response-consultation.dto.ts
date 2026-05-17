import { Exclude, Expose } from 'class-transformer';

export class ResponseConsultationDto {
  @Expose()
  id: number;

  @Expose()
  patientName: string;

  @Expose()
  age: number;

  @Expose()
  gender: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email?: string;

  @Expose()
  address: string;

  @Expose()
  symptoms: string;

  @Expose()
  doctorName: string;

  @Expose()
  specialization: string;

  @Expose()
  appointmentDate: Date;

  @Expose()
  appointmentTime: string;

  @Expose()
  status: string;

  @Expose()
  diagnosis?: string;

  @Expose()
  treatmentPlan?: string;

  @Expose()
  prescription?: string;

  @Expose()
  nextAppointmentDate?: Date;

  @Expose()
  nextAppointmentTime?: string;

  @Expose()
  notes?: string;

  @Expose()
  createdAt?: Date;

  // Exclude sensitive/internal fields
  @Exclude()
  medicalHistory?: string;

  @Exclude()
  allergies?: string;

  @Exclude()
  currentMedications?: string;


  @Exclude()
  isFirstVisit?: boolean;

  @Exclude()
  chiefComplaint?: string;

  @Exclude()
  dentalHistory?: string;

  @Exclude()
  oralExamination?: string;

  constructor(partial: Partial<ResponseConsultationDto>) {
    Object.assign(this, partial);
  }
}