import { IsEnum, IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PlumbingServiceType } from './create-plumbing-service.dto';
import { PlumbingServiceStatus } from './update-plumbing-service.dto';

export class FilterPlumbingServiceDto {
  @ApiPropertyOptional({ enum: PlumbingServiceStatus, description: 'Filter by booking status' })
  @IsEnum(PlumbingServiceStatus)
  @IsOptional()
  status?: PlumbingServiceStatus;

  @ApiPropertyOptional({ enum: PlumbingServiceType, description: 'Filter by service type' })
  @IsEnum(PlumbingServiceType)
  @IsOptional()
  serviceType?: PlumbingServiceType;

  @ApiPropertyOptional({ example: '2025-06-01', description: 'Filter bookings from this date' })
  @IsDateString()
  @IsOptional()
  fromDate?: string;

  @ApiPropertyOptional({ example: '2025-06-30', description: 'Filter bookings until this date' })
  @IsDateString()
  @IsOptional()
  toDate?: string;

  @ApiPropertyOptional({ example: 'Ali', description: 'Search by customer name' })
  @IsString()
  @IsOptional()
  search?: string;
}