import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePlumbingServiceDto } from './create-plumbing-service.dto';

export enum PlumbingServiceStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class UpdatePlumbingServiceDto extends PartialType(CreatePlumbingServiceDto) {
  @ApiPropertyOptional({
    enum: PlumbingServiceStatus,
    example: PlumbingServiceStatus.CONFIRMED,
    description: 'Current status of the service booking',
  })
  @IsEnum(PlumbingServiceStatus)
  @IsOptional()
  status?: PlumbingServiceStatus;

  @ApiPropertyOptional({ example: 180.0, description: 'Final billed amount after service completion' })
  @IsNumber()
  @Min(0)
  @Max(10000)
  @IsOptional()
  totalAmount?: number;
}