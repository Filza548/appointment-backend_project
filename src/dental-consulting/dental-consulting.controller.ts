import {Controller,Get,Post,Body,Param,Query,ParseIntPipe,UsePipes,ValidationPipe,HttpCode,HttpStatus, UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './dental-consulting.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { ResponseConsultationDto } from './dto/response-consultation.dto';
import { plainToInstance } from 'class-transformer';


@Controller('consultations')

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}


 
  // POST - Create new consultation
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateConsultationDto,
  ): Promise<ResponseConsultationDto> {
    const consultation = await this.consultationService.create(createDto);
 return plainToInstance(ResponseConsultationDto, consultation, { // ✅ singular
    excludeExtraneousValues: true,
  });
  }

 


  // GET  - All consultations with filters
  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('doctorName') doctorName?: string,
    @Query('status') status?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ): Promise<ResponseConsultationDto[]> {
    const filters = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      doctorName,
      status,
      phoneNumber,
    };
    const consultations = await this.consultationService.findAll(filters);
   return plainToInstance(ResponseConsultationDto, consultations, {
  excludeExtraneousValues: true,
});
  }

  // GET - Today's consultations
  @Get('today')
  async getToday(): Promise<ResponseConsultationDto[]> {
    const consultations = await this.consultationService.getTodayConsultations();
    return plainToInstance(ResponseConsultationDto, consultations, {
  excludeExtraneousValues: true,
});
  }

  // GET - Upcoming consultations
  @Get('upcoming')
  async getUpcoming(): Promise<ResponseConsultationDto[]> {
    const consultations = await this.consultationService.getUpcomingConsultations();
    return plainToInstance(ResponseConsultationDto, consultations, {
  excludeExtraneousValues: true,
});
  }

  // GET - Consultation by ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseConsultationDto> {
    const consultation = await this.consultationService.findOne(id);
   return plainToInstance(ResponseConsultationDto, consultation, { // ✅ singular
    excludeExtraneousValues: true,
  });

  }

  // GET - Consultations by phone number
  @Get('phone/:phone')
  async findByPhone(
    @Param('phone') phone: string,
  ): Promise<ResponseConsultationDto[]> {
    const consultations = await this.consultationService.findByPhone(phone);
    return plainToInstance(ResponseConsultationDto, consultations, {
  excludeExtraneousValues: true,
});
  }
}