// business-consultation.controller.ts
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
  HttpStatus,
} from '@nestjs/common';
import { BusinessConsultationService } from './business-consulting.service';
import { CreateBusinessConsultationDto } from './dto/create-business.dto';
import { UpdateBusinessConsultationDto } from './dto/update-business.dto';

@Controller('business-consultations')
export class BusinessConsultationController {
  constructor(
    private readonly businessService: BusinessConsultationService,
  ) {}

  // ✅ GET ALL → GET /business-consultations
  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.businessService.findAll(),
    };
  }

  // ✅ GET ONE → GET /business-consultations/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.businessService.findOne(id),
    };
  }

  // ✅ CREATE → POST /business-consultations
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBusinessConsultationDto) {
    return {
      success: true,
      message: 'Business Consultation create ho gaya',
      data: await this.businessService.create(dto),
    };
  }

  // ✅ UPDATE → PUT /business-consultations/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBusinessConsultationDto,
  ) {
    return {
      success: true,
      message: 'Business Consultation update ho gaya',
      data: await this.businessService.update(id, dto),
    };
  }

  // ✅ DELETE → DELETE /business-consultations/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.businessService.remove(id),
    };
  }
}