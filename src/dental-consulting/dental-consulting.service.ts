import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Consultation } from './dentalconsulting.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
  ) {}

  // Create new consultation
  async create(createDto: CreateConsultationDto): Promise<Consultation> {
    try {
      // Check if appointment slot is already booked
      const existingAppointment = await this.consultationRepository.findOne({
        where: {
          doctorName: createDto.doctorName,
          appointmentDate: createDto.appointmentDate,
          appointmentTime: createDto.appointmentTime,
        },
      });

      if (existingAppointment) {
        throw new BadRequestException('This appointment slot is already booked. Please choose another time.');
      }

      const consultation = this.consultationRepository.create(createDto);
      return await this.consultationRepository.save(consultation);
    } catch (error) {
      throw new BadRequestException((error as Error).message || 'Failed to create consultation');
    }
  }

  // Get all consultations with optional filters
  async findAll(filters?: {
    startDate?: Date;
    endDate?: Date;
    doctorName?: string;
    status?: string;
    phoneNumber?: string;
  }): Promise<Consultation[]> {
    const where: any = {};

    if (filters?.startDate && filters?.endDate) {
      where.appointmentDate = Between(filters.startDate, filters.endDate);
    } else if (filters?.startDate) {
      where.appointmentDate = filters.startDate;
    }

    if (filters?.doctorName) {
      where.doctorName = Like(`%${filters.doctorName}%`);
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.phoneNumber) {
      where.phoneNumber = Like(`%${filters.phoneNumber}%`);
    }

    return await this.consultationRepository.find({
      where,
      order: { appointmentDate: 'DESC', createdAt: 'DESC' },
    });
  }

  // Get consultation by ID
  async findOne(id: number): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }

    return consultation;
  }

  // Get today's consultations
  async getTodayConsultations(): Promise<Consultation[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.consultationRepository.find({
      where: {
        appointmentDate: Between(today, tomorrow),
      },
      order: { appointmentTime: 'ASC' },
    });
  }

  // Get consultations by phone number
  async findByPhone(phoneNumber: string): Promise<Consultation[]> {
    return await this.consultationRepository.find({
      where: { phoneNumber },
      order: { createdAt: 'DESC' },
    });
  }

  // Get upcoming consultations
  async getUpcomingConsultations(): Promise<Consultation[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.consultationRepository.find({
      where: {
        appointmentDate: Between(today, new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)), // Next 30 days
        status: 'Scheduled',
      },
      order: { appointmentDate: 'ASC', appointmentTime: 'ASC' },
      take: 20,
    });
  }
}