import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('plumbing_services')
export class PlumbingService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: ['emergency', 'leak_repair', 'installation', 'maintenance'] })
  serviceType: string;

  @Column({ type: 'date' })
  scheduledDate: Date;

  @Column({ type: 'time', nullable: true })
  scheduledTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  serviceAddress: string;

  @Column({ type: 'boolean', default: false })
  inspectionCompleted: boolean;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  @Column({ type: 'int', nullable: true, comment: 'Estimated duration in hours' })
  estimatedDurationHours: number;

  @Column({ type: 'text', nullable: true })
  issueDescription: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}