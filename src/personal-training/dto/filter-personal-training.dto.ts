import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { SessionStatus, SessionMode, PackageType, FitnessGoal } from './create-personal-training.dto';

export class FilterPersonalTrainingDto {
  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  trainerName?: string;

  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;

  @IsEnum(SessionMode)
  @IsOptional()
  sessionMode?: SessionMode;

  @IsEnum(PackageType)
  @IsOptional()
  packageType?: PackageType;

  @IsEnum(FitnessGoal)
  @IsOptional()
  fitnessGoal?: FitnessGoal;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}