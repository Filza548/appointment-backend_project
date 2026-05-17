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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PlumbingServiceType {
  EMERGENCY = 'emergency',
  LEAK_REPAIR = 'leak_repair',
  INSTALLATION = 'installation',
  MAINTENANCE = 'maintenance',
}

export class CreatePlumbingServiceDto {
  @ApiProperty({ example: 'Ali Hassan', description: 'Customer full name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  customerName: string;

  @ApiProperty({ example: '+923001234567', description: 'Customer phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @ApiPropertyOptional({ example: 'ali@example.com', description: 'Customer email address' })
  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email?: string;

  @ApiProperty({
    enum: PlumbingServiceType,
    example: PlumbingServiceType.LEAK_REPAIR,
    description: 'Type of plumbing service',
  })
  @IsEnum(PlumbingServiceType)
  @IsNotEmpty()
  serviceType: PlumbingServiceType;

  @ApiProperty({ example: '2025-06-15', description: 'Scheduled date for service (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  scheduledDate: string;

  @ApiPropertyOptional({ example: '10:00', description: 'Scheduled time for service (HH:mm)' })
  @IsString()
  @IsOptional()
  scheduledTime?: string;

  @ApiPropertyOptional({ example: 'House #5, Street 7, Islamabad', description: 'Service location address' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  serviceAddress?: string;

  @ApiPropertyOptional({ example: false, description: 'Whether pre-inspection has been completed' })
  @IsBoolean()
  @IsOptional()
  inspectionCompleted?: boolean;

  @ApiPropertyOptional({ example: 150.0, description: 'Estimated cost between $50–$250' })
  @IsNumber()
  @Min(50)
  @Max(250)
  @IsOptional()
  estimatedAmount?: number;

  @ApiPropertyOptional({ example: 2, description: 'Estimated duration in hours (1–2 hours typical)' })
  @IsInt()
  @Min(1)
  @Max(24)
  @IsOptional()
  estimatedDurationHours?: number;

  @ApiPropertyOptional({ example: 'There is a leaking pipe under the kitchen sink.', description: 'Description of the plumbing issue' })
  @IsString()
  @IsOptional()
  issueDescription?: string;

  @ApiPropertyOptional({ example: 'Customer prefers morning appointments.', description: 'Additional notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}