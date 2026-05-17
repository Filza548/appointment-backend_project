import {
  Controller, Get, Post, Body, Param, Query,
  Delete, Patch, UsePipes, ValidationPipe,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { MakeupBridalService } from './make-up.service';
import { CreateMakeupBridalDto } from './dto/create-makeup.dto';
import { UpdateMakeupBridalDto } from './dto/update-makeup-bridal.dto';
import { ResponseMakeupBridalDto } from './dto/response-makeup.dto';
import { plainToInstance } from 'class-transformer';

const toResponse = (data: any) =>
  plainToInstance(ResponseMakeupBridalDto, data, {
    excludeExtraneousValues: true,
  });

@Controller('makeup-bridal')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class MakeupBridalController {
  constructor(private readonly service: MakeupBridalService) {}

  // POST - Create
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMakeupBridalDto) {
    const booking = await this.service.create(dto);
    return toResponse(booking);
  }

  // GET - All with filters
  // @Get()
  // async findAll(
  //   @Query('serviceType') serviceType?: string,
  //   @Query('status') status?: string,
  //   @Query('startDate') startDate?: string,
  //   @Query('endDate') endDate?: string,
  //   @Query('phone') phone?: string,
  // ) {
  //   const filters = {
  //     serviceType,
  //     status,
  //     phone,
  //     startDate: startDate ? new Date(startDate) : undefined,
  //     endDate: endDate ? new Date(endDate) : undefined,
  //   };
  //   const bookings = await this.service.findAll(filters);
  //   return toResponse(bookings);
  // }


  @Get()
async findAll(
  @Query('serviceType') serviceType?: string,
  @Query('status') status?: string,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,
  @Query('phone') phone?: string,
) {
  const filters = {
    serviceType,
    status,
    phone,
    startDate: startDate ? new Date(startDate) : undefined,  // ✅ Fixed
    endDate: endDate ? new Date(endDate) : undefined,        // ✅ Fixed
  };
  const bookings = await this.service.findAll(filters);
  return { data: bookings };  // ✅ Array return karo
}

  // GET - Today
  @Get('today')
  async getToday() {
    const bookings = await this.service.getToday();
    return toResponse(bookings);
  }

  // GET - Upcoming
  @Get('upcoming')
  async getUpcoming() {
    const bookings = await this.service.getUpcoming();
    return toResponse(bookings);
  }

  // GET - By ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await this.service.findOne(id);
    return toResponse(booking);
  }

  // PATCH - Update
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMakeupBridalDto,
  ) {
    const booking = await this.service.update(id, dto);
    return toResponse(booking);
  }

  // PATCH - Update Status only
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: string,
  ) {
    const booking = await this.service.updateStatus(id, status);
    return toResponse(booking);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}