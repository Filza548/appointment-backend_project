import {  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  // Patient Information
  @Column({ type: 'varchar', length: 100 })
  patientName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true})
  address: string;

  // Medical Information
  @Column({ type: 'text' })
  symptoms: string;

  @Column({ type: 'text', nullable: true })
  medicalHistory: string;

  @Column({ type: 'text', nullable: true })
  allergies: string;

  @Column({ type: 'text', nullable: true })
  currentMedications: string;

  @Column({ type: 'boolean', default: true })
  isFirstVisit: boolean;

  // Dental Specific
  @Column({ type: 'text', nullable: true })
  chiefComplaint: string;

  @Column({ type: 'text', nullable: true })
  dentalHistory: string;

  @Column({ type: 'text', nullable: true })
  oralExamination: string;

  // Doctor & Appointment
  @Column({ type: 'varchar', length: 100 })
  doctorName: string;

  @Column({ type: 'varchar', length: 100 })
  specialization: string;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  appointmentTime: string;

  // Diagnosis & Treatment (optional, can be updated later)
  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatmentPlan: string;

  @Column({ type: 'text', nullable: true })
  prescription: string;

  // Follow-up
  @Column({ type: 'date', nullable: true })
  nextAppointmentDate: Date;

  @Column({ type: 'time', nullable: true })
  nextAppointmentTime: string;

  // Status
  @Column({ type: 'varchar', length: 50, default: 'Scheduled' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}