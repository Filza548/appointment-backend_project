// legal-consultation.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('legal_consultations')
export class LegalConsultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  clientName: string;

  @Column({ type: 'varchar', length: 20 })
  clientPhone: string;

  @Column({ type: 'varchar', length: 255 })
  clientEmail: string;

  @Column({ type: 'text' })
  caseType: string; // Criminal, Civil, Family, etc.

  @Column({ type: 'text' })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @Column({ type: 'date', nullable: true })
  consultationDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}