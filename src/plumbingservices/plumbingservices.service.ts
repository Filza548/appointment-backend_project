import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like, FindOptionsWhere } from 'typeorm';
import { PlumbingService } from '../plumbingservices/plumbing-service.entity';
import { CreatePlumbingServiceDto } from './dto/create-plumbing-service.dto';
import { UpdatePlumbingServiceDto, PlumbingServiceStatus } from './dto/update-plumbing-service.dto';
import { FilterPlumbingServiceDto } from './dto/filter-plumbing-service.dto';

@Injectable()
export class PlumbingServiceService {
  constructor(
    @InjectRepository(PlumbingService)
    private readonly plumbingRepo: Repository<PlumbingService>,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(dto: CreatePlumbingServiceDto): Promise<PlumbingService> {
    const booking = this.plumbingRepo.create({
      ...dto,
      scheduledDate: new Date(dto.scheduledDate),
      status: PlumbingServiceStatus.PENDING,
    });
    return this.plumbingRepo.save(booking);
  }

  // ─── Find All (with filters) ───────────────────────────────────────────────

  async findAll(filters: FilterPlumbingServiceDto): Promise<PlumbingService[]> {
    const where: FindOptionsWhere<PlumbingService> = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.serviceType) {
      where.serviceType = filters.serviceType;
    }

    if (filters.fromDate && filters.toDate) {
      where.scheduledDate = Between(
        new Date(filters.fromDate),
        new Date(filters.toDate),
      ) as any;
    }

    if (filters.search) {
      where.customerName = Like(`%${filters.search}%`);
    }

    return this.plumbingRepo.find({
      where,
      order: { scheduledDate: 'ASC', createdAt: 'DESC' },
    });
  }

  // ─── Find One ─────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<PlumbingService> {
    const booking = await this.plumbingRepo.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Plumbing service booking with ID "${id}" not found`);
    }
    return booking;
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdatePlumbingServiceDto): Promise<PlumbingService> {
    const booking = await this.findOne(id);

    // Business rule: cannot update a cancelled or completed booking
    if (
      booking.status === PlumbingServiceStatus.CANCELLED ||
      booking.status === PlumbingServiceStatus.COMPLETED
    ) {
      throw new BadRequestException(
        `Cannot update a booking that is already "${booking.status}"`,
      );
    }

    // Business rule: totalAmount can only be set when completing
    if (dto.totalAmount && dto.status !== PlumbingServiceStatus.COMPLETED) {
      throw new BadRequestException(
        'Total amount can only be set when marking the service as completed',
      );
    }

    const updated = Object.assign(booking, {
      ...dto,
      ...(dto.scheduledDate && { scheduledDate: new Date(dto.scheduledDate) }),
    });

    return this.plumbingRepo.save(updated);
  }

  // ─── Cancel ───────────────────────────────────────────────────────────────

  async cancel(id: string): Promise<PlumbingService> {
    const booking = await this.findOne(id);

    if (booking.status === PlumbingServiceStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel an already completed service');
    }

    if (booking.status === PlumbingServiceStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    booking.status = PlumbingServiceStatus.CANCELLED;
    return this.plumbingRepo.save(booking);
  }

  // ─── Complete ─────────────────────────────────────────────────────────────

  async complete(id: string, totalAmount: number): Promise<PlumbingService> {
    const booking = await this.findOne(id);

    if (booking.status !== PlumbingServiceStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Service must be "in_progress" before it can be marked as completed',
      );
    }

    booking.status = PlumbingServiceStatus.COMPLETED;
    booking.totalAmount = totalAmount;
    booking.inspectionCompleted = true;
    return this.plumbingRepo.save(booking);
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  async remove(id: string): Promise<{ message: string }> {
    const booking = await this.findOne(id);
    await this.plumbingRepo.remove(booking);
    return { message: `Plumbing service booking "${id}" has been deleted successfully` };
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    const [total, pending, confirmed, inProgress, completed, cancelled] =
      await Promise.all([
        this.plumbingRepo.count(),
        this.plumbingRepo.count({ where: { status: PlumbingServiceStatus.PENDING } }),
        this.plumbingRepo.count({ where: { status: PlumbingServiceStatus.CONFIRMED } }),
        this.plumbingRepo.count({ where: { status: PlumbingServiceStatus.IN_PROGRESS } }),
        this.plumbingRepo.count({ where: { status: PlumbingServiceStatus.COMPLETED } }),
        this.plumbingRepo.count({ where: { status: PlumbingServiceStatus.CANCELLED } }),
      ]);

    const revenueResult = await this.plumbingRepo
      .createQueryBuilder('ps')
      .select('SUM(ps.totalAmount)', 'revenue')
      .where('ps.status = :status', { status: PlumbingServiceStatus.COMPLETED })
      .getRawOne();

    return {
      total,
      pending,
      confirmed,
      inProgress,
      completed,
      cancelled,
      totalRevenue: parseFloat(revenueResult?.revenue ?? '0'),
    };
  }
}