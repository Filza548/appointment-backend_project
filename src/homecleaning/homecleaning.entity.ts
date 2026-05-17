import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('home_cleaning_services')
export class HomeCleaning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: ['deep_cleaning', 'regular_maintenance', 'eco_friendly', 'insured'] })
  serviceType: string;

  @Column({ type: 'date' })
  scheduledDate: Date;

  @Column({ type: 'time', nullable: true })
  scheduledTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'boolean', default: false })
  ecoFriendlyProducts: boolean;

  @Column({ type: 'boolean', default: true })
  isInsured: boolean;

  @Column({ type: 'int', nullable: true, comment: 'Estimated duration in hours (e.g., 2-3 hours)' })
  estimatedHours: number;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Price range $60 - $200' })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}