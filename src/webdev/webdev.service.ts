import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { WebDevelopmentProject } from './webdev.entity';
import { CreateWebDevProjectDto, ProjectStatus } from './dto/create-web-dev-project.dto';
import { UpdateWebDevProjectDto } from './dto/update-web-dev-project.dto';
import { FilterWebDevProjectDto } from './dto/filter-web-dev-project.dto';

@Injectable()
export class WebDevProjectService {
  constructor(
    @InjectRepository(WebDevelopmentProject)
    private readonly projectRepository: Repository<WebDevelopmentProject>,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(dto: CreateWebDevProjectDto): Promise<WebDevelopmentProject> {
    if (dto.deadline && dto.startDate) {
      const start = new Date(dto.startDate);
      const deadline = new Date(dto.deadline);
      if (deadline <= start) {
        throw new BadRequestException('Deadline must be after start date');
      }
    }

    const project = this.projectRepository.create({
      ...dto,
      status: ProjectStatus.PLANNING,
    });

    return await this.projectRepository.save(project);
  }

  // ─── Find All (with filters + pagination) ─────────────────────────────────

  async findAll(filterDto: FilterWebDevProjectDto): Promise<{
    data: WebDevelopmentProject[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { status, projectType, techStack, clientName, page = 1, limit = 10 } = filterDto;

    const where: FindOptionsWhere<WebDevelopmentProject> = {};

    if (status) where.status = status;
    if (projectType) where.projectType = projectType;
    if (techStack) where.techStack = techStack;
    if (clientName) where.clientName = Like(`%${clientName}%`);

    const [data, total] = await this.projectRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ─── Find One ─────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<WebDevelopmentProject> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateWebDevProjectDto): Promise<WebDevelopmentProject> {
    const project = await this.findOne(id);

    if (project.status === ProjectStatus.CANCELLED) {
      throw new BadRequestException('Cannot update a cancelled project');
    }

    if (dto.deadline && dto.startDate) {
      const start = new Date(dto.startDate);
      const deadline = new Date(dto.deadline);
      if (deadline <= start) {
        throw new BadRequestException('Deadline must be after start date');
      }
    }

    Object.assign(project, dto);
    return await this.projectRepository.save(project);
  }

  // ─── Update Status ────────────────────────────────────────────────────────

  async updateStatus(id: string, status: ProjectStatus): Promise<WebDevelopmentProject> {
    const project = await this.findOne(id);

    const validTransitions: Record<ProjectStatus, ProjectStatus[]> = {
      [ProjectStatus.PLANNING]: [ProjectStatus.IN_PROGRESS, ProjectStatus.CANCELLED],
      [ProjectStatus.IN_PROGRESS]: [ProjectStatus.REVIEW, ProjectStatus.CANCELLED],
      [ProjectStatus.REVIEW]: [ProjectStatus.COMPLETED, ProjectStatus.IN_PROGRESS],
      [ProjectStatus.COMPLETED]: [],
      [ProjectStatus.CANCELLED]: [],
    };

    if (!validTransitions[project.status].includes(status)) {
      throw new BadRequestException(
        `Cannot transition from "${project.status}" to "${status}"`,
      );
    }

    project.status = status;
    return await this.projectRepository.save(project);
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  async remove(id: string): Promise<{ message: string }> {
    const project = await this.findOne(id);

    if (project.status === ProjectStatus.IN_PROGRESS) {
      throw new BadRequestException('Cannot delete a project that is in progress');
    }

    await this.projectRepository.remove(project);
    return { message: `Project "${project.clientName}" deleted successfully` };
  }

  // ─── Stats / Dashboard ────────────────────────────────────────────────────

  async getStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byTechStack: Record<string, number>;
    byProjectType: Record<string, number>;
    totalBudget: number;
  }> {
    const projects = await this.projectRepository.find();

    const byStatus: Record<string, number> = {};
    const byTechStack: Record<string, number> = {};
    const byProjectType: Record<string, number> = {};
    let totalBudget = 0;

    for (const project of projects) {
      // Status count
      byStatus[project.status] = (byStatus[project.status] || 0) + 1;

      // Tech stack count
      byTechStack[project.techStack] = (byTechStack[project.techStack] || 0) + 1;

      // Project type count
      byProjectType[project.projectType] = (byProjectType[project.projectType] || 0) + 1;

      // Total budget
      if (project.projectBudget) totalBudget += Number(project.projectBudget);
    }

    return {
      total: projects.length,
      byStatus,
      byTechStack,
      byProjectType,
      totalBudget,
    };
  }
}