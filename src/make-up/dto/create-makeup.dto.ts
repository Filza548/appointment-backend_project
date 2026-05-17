import {
  IsString, IsOptional, IsEmail, IsBoolean,
  IsDate, IsNumber, IsEnum, Length, Matches, Min
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ServiceType {
  BRIDAL = 'bridal',
  PARTY = 'party',
  HAIR = 'hair',
  TRIAL = 'trial',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateMakeupBridalDto {

  @IsString()
  @Length(2, 50)
  customerName: string;

  @IsString()
  @Length(10, 20)
  @Matches(/^[0-9+\-\s]+$/, { message: 'Phone number must contain only digits, +, - or spaces' })
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(ServiceType, { message: 'serviceType must be bridal, party, hair or trial' })
  serviceType: ServiceType;

  @Type(() => Date)
  @IsDate()
  eventDate: Date;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'eventTime must be in HH:MM format' })
  eventTime?: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  location?: string;

  @IsOptional()
  @IsBoolean()
  trialCompleted?: boolean;

  @IsOptional()
  @IsEnum(BookingStatus, { message: 'status must be pending, confirmed, completed or cancelled' })
  status?: BookingStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}