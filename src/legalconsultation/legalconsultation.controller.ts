// legal-consultation.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Put,
  Delete, 
  Body, 
  Param, 
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { LegalConsultationService } from './legalconsultation.service';
import { CreateLegalConsultationDto } from './dto/createlega.dto';
import { UpdateLegalConsultationDto } from './dto/update-legal-consultation.dto';

@Controller('legal-consultations')
export class LegalConsultationController {
  constructor(private readonly consultationService: LegalConsultationService) {}

  // ✅ GET ALL  →  GET /legal-consultations
  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.consultationService.findAll(),
    };
  }

  // ✅ GET ONE  →  GET /legal-consultations/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.consultationService.findOne(id),
    };
  }

  // ✅ CREATE  →  POST /legal-consultations
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLegalConsultationDto) {
    return {
      success: true,
      message: 'Consultation create ho gaya',
      data: await this.consultationService.create(dto),
    };
  }

  // ✅ UPDATE  →  PUT /legal-consultations/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLegalConsultationDto,
  ) {
    return {
      success: true,
      message: 'Consultation update ho gaya',
      data: await this.consultationService.update(id, dto),
    };
  }

  // ✅ DELETE  →  DELETE /legal-consultations/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.consultationService.remove(id),
    };
  }
}