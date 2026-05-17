import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HomeCleaningService } from '../homecleaning/homecleaning.service';
import { CreateHomeCleaningDto } from './dto/create-home-cleaning.dto';
import { UpdateHomeCleaningDto, BookingStatus } from './dto/update-home-cleaning.dto';
import { HomeCleaning } from '../homecleaning/homecleaning.entity';

@Controller('home-cleaning')
export class HomeCleaningController {
  constructor(private readonly homeCleaningService: HomeCleaningService) {}

  // ─── POST /home-cleaning ──────────────────────────────────────────────────────
  // New booking create karo
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateHomeCleaningDto,
  ): Promise<{ message: string; data: HomeCleaning }> {
    const booking = await this.homeCleaningService.create(createDto);
    return {
      message: 'Booking successfully created',
      data: booking,
    };
  }

  // ─── GET /home-cleaning ───────────────────────────────────────────────────────
  // Saare bookings lao — optional ?status= filter ke saath
  @Get()
  async findAll(
    @Query('status') status?: BookingStatus,
  ): Promise<{ message: string; data: HomeCleaning[] }> {
    const bookings = status
      ? await this.homeCleaningService.findByStatus(status)
      : await this.homeCleaningService.findAll();

    return {
      message: 'Bookings fetched successfully',
      data: bookings,
    };
  }

  // ─── GET /home-cleaning/stats ─────────────────────────────────────────────────
  // Dashboard stats
  @Get('stats')
  async getStats() {
    const stats = await this.homeCleaningService.getStats();
    return {
      message: 'Stats fetched successfully',
      data: stats,
    };
  }

  // ─── GET /home-cleaning/by-date?date=YYYY-MM-DD ───────────────────────────────
  // Kisi specific date ke bookings
  @Get('by-date')
  async findByDate(
    @Query('date') date: string,
  ): Promise<{ message: string; data: HomeCleaning[] }> {
    const bookings = await this.homeCleaningService.findByDate(date);
    return {
      message: `Bookings for ${date} fetched successfully`,
      data: bookings,
    };
  }

  // ─── GET /home-cleaning/:id ───────────────────────────────────────────────────
  // Single booking by ID
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string; data: HomeCleaning }> {
    const booking = await this.homeCleaningService.findOne(id);
    return {
      message: 'Booking fetched successfully',
      data: booking,
    };
  }

  // ─── PUT /home-cleaning/:id ───────────────────────────────────────────────────
  // Full update
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateHomeCleaningDto,
  ): Promise<{ message: string; data: HomeCleaning }> {
    const booking = await this.homeCleaningService.update(id, updateDto);
    return {
      message: 'Booking updated successfully',
      data: booking,
    };
  }

  // ─── PATCH /home-cleaning/:id/status ─────────────────────────────────────────
  // Sirf status update karo
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: BookingStatus,
  ): Promise<{ message: string; data: HomeCleaning }> {
    const booking = await this.homeCleaningService.updateStatus(id, status);
    return {
      message: `Booking status updated to "${status}"`,
      data: booking,
    };
  }

  // ─── DELETE /home-cleaning/:id ────────────────────────────────────────────────
  // Booking delete karo
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return await this.homeCleaningService.remove(id);
  }
}