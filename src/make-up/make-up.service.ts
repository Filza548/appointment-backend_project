// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between, Like } from 'typeorm';
// import { MakeupBridal } from './makeup.entity';
// import { CreateMakeupBridalDto } from './dto/create-makeup.dto';
// import { UpdateMakeupBridalDto } from './dto/update-makeup-bridal.dto';

// @Injectable()
// export class MakeupBridalService {
//   constructor(
//     @InjectRepository(MakeupBridal)
//     private readonly repo: Repository<MakeupBridal>,
//   ) {}

//   // ==================== CREATE ====================

//   async create(dto: CreateMakeupBridalDto): Promise<MakeupBridal> {
//     try {
//       const existing = await this.repo.findOne({
//         where: {
//           phone: dto.phone,
//           eventDate: dto.eventDate,
//           serviceType: dto.serviceType,
//         },
//       });

//       if (existing) {
//         throw new BadRequestException(
//           'A booking with this phone, date and service type already exists.'
//         );
//       }

//       const booking = this.repo.create(dto);
//       return await this.repo.save(booking);
//     } catch (error) {
//       throw new BadRequestException(error.message || 'Failed to create booking');
//     }
//   }

//   // ==================== FIND ALL WITH FILTERS ====================

//   async findAll(filters?: {
//     serviceType?: string;
//     status?: string;
//     startDate?: Date;
//     endDate?: Date;
//     phone?: string;
//   }): Promise<MakeupBridal[]> {
//     const where: any = {};

//     if (filters?.serviceType) where.serviceType = filters.serviceType;
//     if (filters?.status) where.status = filters.status;
//     if (filters?.phone) where.phone = Like(`%${filters.phone}%`);

//     if (filters?.startDate && filters?.endDate) {
//       where.eventDate = Between(filters.startDate, filters.endDate);
//     } else if (filters?.startDate) {
//       where.eventDate = filters.startDate;
//     }

//     return await this.repo.find({
//       where,
//       order: { eventDate: 'ASC', createdAt: 'DESC' },
//     });
//   }

//   // ==================== FIND ONE ====================

//   async findOne(id: string): Promise<MakeupBridal> {
//     const booking = await this.repo.findOne({ where: { id } });
//     if (!booking) {
//       throw new NotFoundException(`Booking with ID ${id} not found`);
//     }
//     return booking;
//   }

//   // ==================== UPDATE ====================

//   async update(id: string, dto: UpdateMakeupBridalDto): Promise<MakeupBridal> {
//     const booking = await this.findOne(id);
//     Object.assign(booking, dto);
//     return await this.repo.save(booking);
//   }

//   // ==================== UPDATE STATUS ====================

//   async updateStatus(id: string, status: string): Promise<MakeupBridal> {
//     const booking = await this.findOne(id);
//     booking.status = status;
//     return await this.repo.save(booking);
//   }

//   // ==================== DELETE ====================

//   async remove(id: string): Promise<{ message: string }> {
//     const booking = await this.findOne(id);
//     await this.repo.remove(booking);
//     return { message: `Booking ${id} successfully deleted` };
//   }

//   // ==================== UPCOMING BOOKINGS ====================

//   async getUpcoming(): Promise<MakeupBridal[]> {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     return await this.repo.find({
//       where: {
//         eventDate: Between(
//           today,
//           new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
//         ),
//         status: 'confirmed',
//       },
//       order: { eventDate: 'ASC' },
//       take: 20,
//     });
//   }

//   // ==================== TODAY'S BOOKINGS ====================

//   async getToday(): Promise<MakeupBridal[]> {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     return await this.repo.find({
//       where: { eventDate: Between(today, tomorrow) },
//       order: { eventTime: 'ASC' },
//     });
//   }
// }









import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { MakeupBridal } from './makeup.entity';
import { CreateMakeupBridalDto } from './dto/create-makeup.dto';
import { UpdateMakeupBridalDto } from './dto/update-makeup-bridal.dto';

@Injectable()
export class MakeupBridalService {
  constructor(
    @InjectRepository(MakeupBridal)
    private readonly repo: Repository<MakeupBridal>,
  ) {}

  // ==================== CREATE ====================

  async create(dto: CreateMakeupBridalDto): Promise<MakeupBridal> {
    try {
      const existing = await this.repo.findOne({
        where: {
          phone: dto.phone,
          eventDate: dto.eventDate,
          serviceType: dto.serviceType,
        },
      });

      if (existing) {
        throw new BadRequestException(
          'A booking with this phone, date and service type already exists.'
        );
      }

      const booking = this.repo.create(dto);
      return await this.repo.save(booking);
    } catch (error) {
      // ✅ Fix: Type checking for error object
      const message = error instanceof Error ? error.message : 'Failed to create booking';
      throw new BadRequestException(message);
    }
  }

  // ==================== FIND ALL WITH FILTERS ====================

  async findAll(filters?: {
    serviceType?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
    phone?: string;
  }): Promise<MakeupBridal[]> {
    const where: any = {};

    if (filters?.serviceType) where.serviceType = filters.serviceType;
    if (filters?.status) where.status = filters.status;
    if (filters?.phone) where.phone = Like(`%${filters.phone}%`);

    if (filters?.startDate && filters?.endDate) {
      where.eventDate = Between(filters.startDate, filters.endDate);
    } else if (filters?.startDate) {
      where.eventDate = filters.startDate;
    }

    return await this.repo.find({
      where,
      order: { eventDate: 'ASC', createdAt: 'DESC' },
    });
  }

  // ==================== FIND ONE ====================

  async findOne(id: string): Promise<MakeupBridal> {
    const booking = await this.repo.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  // ==================== UPDATE ====================

  async update(id: string, dto: UpdateMakeupBridalDto): Promise<MakeupBridal> {
    const booking = await this.findOne(id);
    Object.assign(booking, dto);
    return await this.repo.save(booking);
  }

  // ==================== UPDATE STATUS ====================

  async updateStatus(id: string, status: string): Promise<MakeupBridal> {
    const booking = await this.findOne(id);
    booking.status = status;
    return await this.repo.save(booking);
  }

  // ==================== DELETE ====================

  async remove(id: string): Promise<{ message: string }> {
    const booking = await this.findOne(id);
    await this.repo.remove(booking);
    return { message: `Booking ${id} successfully deleted` };
  }

  // ==================== UPCOMING BOOKINGS ====================

  async getUpcoming(): Promise<MakeupBridal[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.repo.find({
      where: {
        eventDate: Between(
          today,
          new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
        ),
        status: 'confirmed',
      },
      order: { eventDate: 'ASC' },
      take: 20,
    });
  }

  // ==================== TODAY'S BOOKINGS ====================

  async getToday(): Promise<MakeupBridal[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.repo.find({
      where: { eventDate: Between(today, tomorrow) },
      order: { eventTime: 'ASC' },
    });
  }
}