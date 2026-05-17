import {
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsInt,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export enum YogaServiceType {
  BEGINNER = 'beginner',
  STRESS_RELIEF = 'stress_relief',
  FLEXIBILITY = 'flexibility',
  BREATHING_EXERCISES = 'breathing_exercises',
}

export class CreateYogaMeditationDto {
  @IsString()
  @MaxLength(50)
  customerName: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsEnum(YogaServiceType)
  serviceType: YogaServiceType;

  @IsDateString()
  sessionDate: string;

  @IsOptional()
  @IsString()
  sessionTime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsBoolean()
  trialCompleted?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(25)
  @Max(80)
  totalAmount?: number;

  @IsOptional()
  @IsInt()
  @Min(30)
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}