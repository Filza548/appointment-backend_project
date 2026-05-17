import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class DoctorConsultation{
  @PrimaryGeneratedColumn()
    id: number;

    // Patient Info
    @Column()
    patientName: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    phoneNumber: string;'['

    @Column()
    email: string;

    // Medical Info
    @Column('text')
    symptoms: string;

    @Column({ default: true })
    isFirstVisit: boolean;

    // Doctor & Appointment
    @Column()
    doctorName: string;

    @Column()
    specialization: string;

    @Column('date')
    appointmentDate: Date;

    @Column()
    appointmentTime: string;
}