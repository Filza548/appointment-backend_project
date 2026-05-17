import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateYogaMeditationDto } from './create-yoga-meditation.dto';

export enum YogaSessionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class UpdateYogaMeditationDto extends PartialType(CreateYogaMeditationDto) {
  @IsOptional()
  @IsEnum(YogaSessionStatus)
  status?: YogaSessionStatus;
}