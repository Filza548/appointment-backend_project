import { Controller, Get, Post, Body, Param, Query, Delete, Patch,ParseIntPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { SalonSpaConsultationService } from './salonspa.service'
import { CreateSalonSpaConsultationDto } from './dto/create-salonspa.dto'
import { ResponseSalonSpaConsultationDto } from './dto/response-salonspa.dto'
import { plainToInstance } from 'class-transformer';

const toResponse = (data: any) =>
  plainToInstance(ResponseSalonSpaConsultationDto, data, {
    excludeExtraneousValues: true,
  });

@Controller('salon-spa-consultations')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SalonSpaConsultationController {
  constructor(private readonly consultationService: SalonSpaConsultationService) {}

  // POST - Create
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateSalonSpaConsultationDto) {
    const consultation = await this.consultationService.create(createDto);
    return toResponse(consultation);
  }

  // GET - All with filters
  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('staffName') staffName?: string,
    @Query('status') status?: string,
    @Query('serviceType') serviceType?: string,
    @Query('paymentStatus') paymentStatus?: string,
  ) {
    const filters = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      staffName,
      status,
      serviceType,
      paymentStatus,
    };
    const consultations = await this.consultationService.findAll(filters);
    return toResponse(consultations);
  }

  // GET - Today
  @Get('today')
  async getToday() {
    const consultations = await this.consultationService.getTodayConsultations();
    return toResponse(consultations);
  }

  // GET - Upcoming
  @Get('upcoming')
  async getUpcoming() {
    const consultations = await this.consultationService.getUpcomingConsultations();
    return toResponse(consultations);
  }

  // GET - By Service Type
  @Get('service/:serviceType')
  async getByServiceType(@Param('serviceType') serviceType: string) {
    const consultations = await this.consultationService.findByServiceType(serviceType);
    return toResponse(consultations);
  }

  // GET - By Phone
  @Get('phone/:phone')
  async findByPhone(@Param('phone') phone: string) {
    const consultations = await this.consultationService.findByPhone(phone);
    return toResponse(consultations);
  }

  // GET - By ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const consultation = await this.consultationService.findOne(id);
    return toResponse(consultation);
  }

  // PATCH - Update Status
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: string,
  ) {
    const consultation = await this.consultationService.updateStatus(id, status);
    return toResponse(consultation);
  }

  // PATCH - Update Payment
  @Patch(':id/payment')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Query('paymentStatus') paymentStatus: string,
    @Query('paymentMethod') paymentMethod?: string,
    @Query('totalAmount') totalAmount?: number,
  ) {
    const consultation = await this.consultationService.updatePayment(
      id, paymentStatus, paymentMethod, totalAmount
    );
    return toResponse(consultation);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.consultationService.remove(id);
  }
}