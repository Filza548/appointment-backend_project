import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { YogaMeditationService } from './yogameditation.service';
import { CreateYogaMeditationDto } from './dto/create-yoga-meditation.dto';
import { UpdateYogaMeditationDto } from './dto/update-yoga-meditation.dto';

@Controller('yoga-meditation')
export class YogaMeditationController {
  constructor(private readonly yogaService: YogaMeditationService) {}

  // POST /yoga-meditation
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateYogaMeditationDto) {
    return this.yogaService.create(dto);
  }

  // GET /yoga-meditation
  // GET /yoga-meditation?status=confirmed
  // GET /yoga-meditation?serviceType=beginner
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('serviceType') serviceType?: string,
  ) {
    if (status) return this.yogaService.findByStatus(status);
    if (serviceType) return this.yogaService.findByServiceType(serviceType);
    return this.yogaService.findAll();
  }

  // GET /yoga-meditation/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yogaService.findOne(id);
  }

  // PATCH /yoga-meditation/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateYogaMeditationDto) {
    return this.yogaService.update(id, dto);
  }

  // DELETE /yoga-meditation/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.yogaService.remove(id);
  }
}