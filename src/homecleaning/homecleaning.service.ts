import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeCleaning } from '../homecleaning/homecleaning.entity';
import { CreateHomeCleaningDto } from './dto/create-home-cleaning.dto';
import { UpdateHomeCleaningDto, BookingStatus } from './dto/update-home-cleaning.dto';

@Injectable()
export class HomeCleaningService {
  constructor(
    @InjectRepository(HomeCleaning)
    private readonly homeCleaningRepository: Repository<HomeCleaning>,
  ) {}

  // ─── Create Booking ───────────────────────────────────────────────────────────
  async create(createDto: CreateHomeCleaningDto): Promise<HomeCleaning> {
    const booking = this.homeCleaningRepository.create({
      ...createDto,
      scheduledDate: new Date(createDto.scheduledDate),
      status: BookingStatus.PENDING,
    });
    return await this.homeCleaningRepository.save(booking);
  }

  // ─── Get All Bookings ─────────────────────────────────────────────────────────
  async findAll(): Promise<HomeCleaning[]> {
    return await this.homeCleaningRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // ─── Get Single Booking ───────────────────────────────────────────────────────
  async findOne(id: string): Promise<HomeCleaning> {
    const booking = await this.homeCleaningRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
    return booking;
  }

  // ─── Get Bookings by Status ───────────────────────────────────────────────────
  async findByStatus(status: BookingStatus): Promise<HomeCleaning[]> {
    return await this.homeCleaningRepository.find({
      where: { status },
      order: { scheduledDate: 'ASC' },
    });
  }

  // ─── Get Bookings by Date ─────────────────────────────────────────────────────
  async findByDate(date: string): Promise<HomeCleaning[]> {
    return await this.homeCleaningRepository.find({
      where: { scheduledDate: new Date(date) },
      order: { scheduledTime: 'ASC' },
    });
  }

  // ─── Update Booking ───────────────────────────────────────────────────────────
  async update(id: string, updateDto: UpdateHomeCleaningDto): Promise<HomeCleaning> {
    const booking = await this.findOne(id);

    // Business rule: cancelled booking cannot be updated
    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Cannot update a cancelled booking');
    }

    // Business rule: completed booking status cannot go back to pending
    if (
      booking.status === BookingStatus.COMPLETED &&
      updateDto.status === BookingStatus.PENDING
    ) {
      throw new BadRequestException('Cannot revert a completed booking to pending');
    }

    Object.assign(booking, {
      ...updateDto,
      scheduledDate: updateDto.scheduledDate
        ? new Date(updateDto.scheduledDate)
        : booking.scheduledDate,
    });

    return await this.homeCleaningRepository.save(booking);
  }

  // ─── Update Status Only ───────────────────────────────────────────────────────
  async updateStatus(id: string, status: BookingStatus): Promise<HomeCleaning> {
    const booking = await this.findOne(id);
    booking.status = status;
    return await this.homeCleaningRepository.save(booking);
  }

  // ─── Delete Booking ───────────────────────────────────────────────────────────
  async remove(id: string): Promise<{ message: string }> {
    const booking = await this.findOne(id);

    if (booking.status === BookingStatus.IN_PROGRESS) {
      throw new BadRequestException('Cannot delete a booking that is currently in progress');
    }

    await this.homeCleaningRepository.remove(booking);
    return { message: `Booking "${id}" has been successfully deleted` };
  }

  // ─── Get Summary Stats ────────────────────────────────────────────────────────
  async getStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    const [total, pending, confirmed, inProgress, completed, cancelled, revenueResult] =
      await Promise.all([
        this.homeCleaningRepository.count(),
        this.homeCleaningRepository.count({ where: { status: BookingStatus.PENDING } }),
        this.homeCleaningRepository.count({ where: { status: BookingStatus.CONFIRMED } }),
        this.homeCleaningRepository.count({ where: { status: BookingStatus.IN_PROGRESS } }),
        this.homeCleaningRepository.count({ where: { status: BookingStatus.COMPLETED } }),
        this.homeCleaningRepository.count({ where: { status: BookingStatus.CANCELLED } }),
        this.homeCleaningRepository
          .createQueryBuilder('booking')
          .select('SUM(booking.totalAmount)', 'total')
          .where('booking.status = :status', { status: BookingStatus.COMPLETED })
          .getRawOne(),
      ]);

    return {
      total,
      pending,
      confirmed,
      inProgress,
      completed,
      cancelled,
      totalRevenue: parseFloat(revenueResult?.total ?? '0'),
    };
  }
}