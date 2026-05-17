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
import { WebDevProjectService } from './webdev.service';
import { CreateWebDevProjectDto, ProjectStatus } from './dto/create-web-dev-project.dto';
import { UpdateWebDevProjectDto } from './dto/update-web-dev-project.dto';
import { FilterWebDevProjectDto } from './dto/filter-web-dev-project.dto';
import { IsEnum } from 'class-validator';

class UpdateStatusDto {
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}

@Controller('web-dev-projects')
export class WebDevProjectController {
  constructor(private readonly webDevProjectService: WebDevProjectService) {}

  // ─── POST /web-dev-projects ───────────────────────────────────────────────
  // Naya project create karo
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateWebDevProjectDto) {
    const project = await this.webDevProjectService.create(createDto);
    return {
      success: true,
      message: 'Project created successfully',
      data: project,
    };
  }

  // ─── GET /web-dev-projects ────────────────────────────────────────────────
  // Saare projects lao (filters + pagination ke sath)
  @Get()
  async findAll(@Query() filterDto: FilterWebDevProjectDto) {
    const result = await this.webDevProjectService.findAll(filterDto);
    return {
      success: true,
      ...result,
    };
  }

  // ─── GET /web-dev-projects/stats ──────────────────────────────────────────
  // Dashboard stats
  @Get('stats')
  async getStats() {
    const stats = await this.webDevProjectService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  // ─── GET /web-dev-projects/:id ────────────────────────────────────────────
  // Single project by ID
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.webDevProjectService.findOne(id);
    return {
      success: true,
      data: project,
    };
  }

  // ─── PUT /web-dev-projects/:id ────────────────────────────────────────────
  // Full update
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateWebDevProjectDto,
  ) {
    const project = await this.webDevProjectService.update(id, updateDto);
    return {
      success: true,
      message: 'Project updated successfully',
      data: project,
    };
  }

  // ─── PATCH /web-dev-projects/:id/status ───────────────────────────────────
  // Sirf status update karo
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateStatusDto,
  ) {
    const project = await this.webDevProjectService.updateStatus(id, body.status);
    return {
      success: true,
      message: `Project status updated to "${body.status}"`,
      data: project,
    };
  }

  // ─── DELETE /web-dev-projects/:id ─────────────────────────────────────────
  // Project delete karo
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.webDevProjectService.remove(id);
    return {
      success: true,
      ...result,
    };
  }
}