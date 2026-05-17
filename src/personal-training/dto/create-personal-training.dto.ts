import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsInt,
  MaxLength,
  MinLength,
  Min,
  Max,
} from 'class-validator';

export enum Gender {
  MALE   = 'male',
  FEMALE = 'female',
  OTHER  = 'other',
}

export enum SessionMode {
  ONLINE  = 'online',
  OFFLINE = 'offline',
}

export enum PackageType {
  SINGLE      = 'single',
  PACKAGE_5   = 'package_5',
  PACKAGE_10  = 'package_10',
  MONTHLY     = 'monthly',
}

export enum FitnessGoal {
  WEIGHT_LOSS      = 'weight_loss',
  MUSCLE_GAIN      = 'muscle_gain',
  ENDURANCE        = 'endurance',
  FLEXIBILITY      = 'flexibility',
  GENERAL_FITNESS  = 'general_fitness',
  REHABILITATION   = 'rehabilitation',
}

export enum SessionStatus {
  SCHEDULED  = 'scheduled',
  CONFIRMED  = 'confirmed',
  COMPLETED  = 'completed',
  CANCELLED  = 'cancelled',
  NO_SHOW    = 'no_show',
}

export class CreatePersonalTrainingDto {
  // ─── Client Info ───────────────────────────────────────────────────────────

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  clientName: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @Min(5)
  @Max(100)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  // ─── Trainer Info ──────────────────────────────────────────────────────────

  @IsString()
  @MaxLength(100)
  trainerName: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  trainerSpecialization?: string;

  // ─── Session Details ───────────────────────────────────────────────────────

  @IsEnum(SessionMode)
  sessionMode: SessionMode;

  @IsEnum(PackageType)
  packageType: PackageType;

  @IsDateString()
  sessionDate: string;

  @IsString()
  sessionTime: string;

  @IsInt()
  @IsOptional()
  @Min(15)
  @Max(180)
  durationMinutes?: number;

  // ─── Fitness Goals ─────────────────────────────────────────────────────────

  @IsEnum(FitnessGoal)
  fitnessGoal: FitnessGoal;

  @IsBoolean()
  @IsOptional()
  customWorkout?: boolean;

  @IsBoolean()
  @IsOptional()
  nutritionAdvice?: boolean;

  @IsBoolean()
  @IsOptional()
  progressTracking?: boolean;

  @IsString()
  @IsOptional()
  currentFitnessLevel?: string;

  @IsString()
  @IsOptional()
  medicalConditions?: string;

  // ─── Pricing ───────────────────────────────────────────────────────────────

  @IsNumber()
  @Min(40)
  @Max(500)
  pricePerSession: number;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  // ─── Notes ─────────────────────────────────────────────────────────────────

  @IsString()
  @IsOptional()
  notes?: string;
}