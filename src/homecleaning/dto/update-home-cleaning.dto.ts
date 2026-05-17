import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateHomeCleaningDto } from './create-home-cleaning.dto';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class UpdateHomeCleaningDto extends PartialType(CreateHomeCleaningDto) {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}