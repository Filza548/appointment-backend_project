// dto/create-business-consultation.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBusinessConsultationDto {
  @IsNotEmpty({ message: 'Business ka naam zaroor likhein' })
  @IsString()
  @MaxLength(255)
  businessName: string;

  @IsNotEmpty({ message: 'Owner ka naam zaroor likhein' })
  @IsString()
  @MaxLength(255)
  ownerName: string;

  @IsNotEmpty({ message: 'Phone number zaroor likhein' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty({ message: 'Email zaroor likhein' })
  @IsEmail({}, { message: 'Sahi email format likhein' })
  @MaxLength(255)
  email: string;

  @IsNotEmpty({ message: 'Consultation type zaroor chunein' })
  @IsString()
  consultationType: string; // Startup, Growth, Marketing, Finance, etc.

  @IsNotEmpty({ message: 'Business problem zaroor likhein' })
  @IsString()
  businessProblem: string;

  @IsOptional()
  @IsEnum(['pending', 'scheduled', 'in-progress', 'completed', 'cancelled'], {
    message: 'Status sahi nahi hai',
  })
  status?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Tarikh sahi format mein likhein' })
  meetingDate?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Budget number hona chahiye' })
  @Min(0, { message: 'Budget 0 se kam nahi ho sakta' })
  budget?: number;
}