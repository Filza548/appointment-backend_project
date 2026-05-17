import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn 
} from 'typeorm';

@Entity('salon_spa_consultations')
export class SalonSpaConsultation {
  @PrimaryGeneratedColumn()
  id: number;

  // ==================== CUSTOMER INFORMATION ====================

  @Column({ type: 'varchar', length: 100 })
  customerName: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  // ==================== SERVICE DETAILS ====================

  @Column({ type: 'varchar', length: 50 })
  serviceType: string; // Salon, Spa, Both

  @Column({ type: 'varchar', length: 50, nullable: true })
  hairService: string; // Haircut, Color, Styling, Treatment

  @Column({ type: 'varchar', length: 50, nullable: true })
  nailService: string; // Manicure, Pedicure, Gel, Acrylic

  @Column({ type: 'varchar', length: 50, nullable: true })
  spaService: string; // Massage, Facial, Body Treatment

  @Column({ type: 'text', nullable: true })
  serviceNotes: string; // Any special instructions

  // ==================== APPOINTMENT DETAILS ====================

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  appointmentTime: string;

  @Column({ type: 'int', default: 60 })
  totalDuration: number; // in minutes

  // ==================== STAFF ====================

  @Column({ type: 'varchar', length: 100 })
  staffName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  staffSpecialization: string;

  // ==================== MEMBERSHIP ====================

  @Column({ type: 'boolean', default: false })
  isMember: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  membershipId: string;

  @Column({ type: 'int', default: 0 })
  loyaltyPoints: number;

  // ==================== PAYMENT ====================

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  paymentStatus: string; // Pending, Paid, Refunded

  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentMethod: string; // Cash, Card, Online

  // ==================== STATUS ====================

  @Column({ type: 'varchar', length: 50, default: 'Scheduled' })
  status: string; // Scheduled, Confirmed, Completed, Cancelled, No-show

  @Column({ type: 'text', nullable: true })
  notes: string;

  // ==================== TIMESTAMPS ====================

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}