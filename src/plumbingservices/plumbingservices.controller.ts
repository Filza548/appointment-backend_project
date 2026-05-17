import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PlumbingServiceService } from '../plumbingservices/plumbingservices.service';
import { CreatePlumbingServiceDto } from './dto/create-plumbing-service.dto';
import { UpdatePlumbingServiceDto, PlumbingServiceStatus } from './dto/update-plumbing-service.dto';
import { FilterPlumbingServiceDto } from './dto/filter-plumbing-service.dto';
import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class CompleteServiceDto {
  @ApiProperty({ example: 180.0, description: 'Final billed amount after service completion' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalAmount: number;
}

@ApiTags('Plumbing Services')
@Controller('plumbing-services')
export class PlumbingServiceController {
  constructor(private readonly plumbingService: PlumbingServiceService) {}

  // ─── POST /plumbing-services ──────────────────────────────────────────────

  @Post()
  @ApiOperation({ summary: 'Book a new plumbing service' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() dto: CreatePlumbingServiceDto) {
    return this.plumbingService.create(dto);
  }

  // ─── GET /plumbing-services ───────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Get all plumbing service bookings with optional filters' })
  @ApiResponse({ status: 200, description: 'List of bookings returned' })
  @ApiQuery({ name: 'status', enum: PlumbingServiceStatus, required: false })
  @ApiQuery({ name: 'serviceType', required: false })
  @ApiQuery({ name: 'fromDate', required: false, example: '2025-06-01' })
  @ApiQuery({ name: 'toDate', required: false, example: '2025-06-30' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by customer name' })
  findAll(@Query() filters: FilterPlumbingServiceDto) {
    return this.plumbingService.findAll(filters);
  }

  // ─── GET /plumbing-services/stats ─────────────────────────────────────────

  @Get('stats')
  @ApiOperation({ summary: 'Get booking statistics and total revenue' })
  @ApiResponse({ status: 200, description: 'Stats returned successfully' })
  getStats() {
    return this.plumbingService.getStats();
  }

  // ─── GET /plumbing-services/:id ───────────────────────────────────────────

  @Get(':id')
  @ApiOperation({ summary: 'Get a single plumbing service booking by ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the booking' })
  @ApiResponse({ status: 200, description: 'Booking found' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.plumbingService.findOne(id);
  }

  // ─── PATCH /plumbing-services/:id ─────────────────────────────────────────

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plumbing service booking' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  @ApiResponse({ status: 400, description: 'Cannot update cancelled or completed booking' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlumbingServiceDto,
  ) {
    return this.plumbingService.update(id, dto);
  }

  // ─── PATCH /plumbing-services/:id/cancel ──────────────────────────────────

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a plumbing service booking' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Booking cancelled' })
  @ApiResponse({ status: 400, description: 'Cannot cancel completed booking' })
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.plumbingService.cancel(id);
  }

  // ─── PATCH /plumbing-services/:id/complete ────────────────────────────────

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark a plumbing service as completed with final bill' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Service marked as completed' })
  @ApiResponse({ status: 400, description: 'Service must be in_progress to complete' })
  complete(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CompleteServiceDto,
  ) {
    return this.plumbingService.complete(id, body.totalAmount);
  }

  // ─── DELETE /plumbing-services/:id ────────────────────────────────────────

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a plumbing service booking' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.plumbingService.remove(id);
  }
}