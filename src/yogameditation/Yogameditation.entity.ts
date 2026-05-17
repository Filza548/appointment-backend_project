import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('yoga_meditation_services')
export class YogaMeditation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: ['beginner', 'stress_relief', 'flexibility', 'breathing_exercises'] })
  serviceType: string;

  @Column({ type: 'date' })
  sessionDate: Date;

  @Column({ type: 'time', nullable: true })
  sessionTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'boolean', default: false })
  trialCompleted: boolean;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number; // Range: $25 - $80

  @Column({ type: 'int', default: 60 })
  durationMinutes: number; // Default: 60 min session

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}