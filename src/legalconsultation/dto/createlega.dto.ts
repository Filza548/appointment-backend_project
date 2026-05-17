// create-legal-consultation.dto.ts
import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsDecimal,
  IsNumber,
  MaxLength,
  IsNotEmpty
} from 'class-validator';

export class CreateLegalConsultationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  clientName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  clientPhone: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  caseType: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsDateString()
  consultationDate?: Date;

  @IsOptional()
  @IsNumber()
  fee?: number;
}