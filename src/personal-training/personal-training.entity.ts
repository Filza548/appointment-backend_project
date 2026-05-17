import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('personal_training_sessions')
export class PersonalTraining {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ─── Client Info ───────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 100 })
  clientName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  // ─── Trainer Info ──────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 100 })
  trainerName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trainerSpecialization: string;

  // ─── Session Details ───────────────────────────────────────────────────────

  @Column({ type: 'enum', enum: ['online', 'offline'] })
  sessionMode: string;

  @Column({ type: 'enum', enum: ['single', 'package_5', 'package_10', 'monthly'] })
  packageType: string;

  @Column({ type: 'date' })
  sessionDate: Date;

  @Column({ type: 'time' })
  sessionTime: string;

  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  // ─── Fitness Goals ─────────────────────────────────────────────────────────

  @Column({ type: 'enum', enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general_fitness', 'rehabilitation'] })
  fitnessGoal: string;

  @Column({ type: 'boolean', default: false })
  customWorkout: boolean;

  @Column({ type: 'boolean', default: false })
  nutritionAdvice: boolean;

  @Column({ type: 'boolean', default: false })
  progressTracking: boolean;

  @Column({ type: 'text', nullable: true })
  currentFitnessLevel: string;

  @Column({ type: 'text', nullable: true })
  medicalConditions: string;

  // ─── Pricing ───────────────────────────────────────────────────────────────

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerSession: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  // ─── Status ────────────────────────────────────────────────────────────────

  @Column({
    type: 'enum',
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}