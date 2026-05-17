import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsInt,
  Min,
  Max,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export enum ServiceType {
  DEEP_CLEANING = 'deep_cleaning',
  REGULAR_MAINTENANCE = 'regular_maintenance',
  ECO_FRIENDLY = 'eco_friendly',
  INSURED = 'insured',
}

export class CreateHomeCleaningDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  customerName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string;

  @IsOptional()
  @IsString()
  scheduledTime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsBoolean()
  ecoFriendlyProducts?: boolean;

  @IsOptional()
  @IsBoolean()
  isInsured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  estimatedHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(60)
  @Max(200)
  totalAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}