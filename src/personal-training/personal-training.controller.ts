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
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { PersonalTrainingService } from './personal-training.service';
import { CreatePersonalTrainingDto, SessionStatus } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { FilterPersonalTrainingDto } from './dto/filter-personal-training.dto';

class UpdateStatusDto {
  @IsEnum(SessionStatus)
  status: SessionStatus;
}

@Controller('personal-training')
export class PersonalTrainingController {
  constructor(private readonly trainingService: PersonalTrainingService) {}

  // ─── POST /personal-training ──────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePersonalTrainingDto) {
    const session = await this.trainingService.create(dto);
    return {
      success: true,
      message: 'Training session booked successfully',
      data: session,
    };
  }

  // ─── GET /personal-training ───────────────────────────────────────────────
  @Get()
  async findAll(@Query() filterDto: FilterPersonalTrainingDto) {
    const result = await this.trainingService.findAll(filterDto);
    return { success: true, ...result };
  }

  // ─── GET /personal-training/stats ─────────────────────────────────────────
  @Get('stats')
  async getStats() {
    const stats = await this.trainingService.getStats();
    return { success: true, data: stats };
  }

  // ─── GET /personal-training/:id ───────────────────────────────────────────
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const session = await this.trainingService.findOne(id);
    return { success: true, data: session };
  }

  // ─── PUT /personal-training/:id ───────────────────────────────────────────
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePersonalTrainingDto,
  ) {
    const session = await this.trainingService.update(id, dto);
    return {
      success: true,
      message: 'Training session updated successfully',
      data: session,
    };
  }

  // ─── PATCH /personal-training/:id/status ──────────────────────────────────
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateStatusDto,
  ) {
    const session = await this.trainingService.updateStatus(id, body.status);
    return {
      success: true,
      message: `Session status updated to "${body.status}"`,
      data: session,
    };
  }

  // ─── DELETE /personal-training/:id ────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.trainingService.remove(id);
    return { success: true, ...result };
  }
}