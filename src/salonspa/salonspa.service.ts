import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { SalonSpaConsultation } from './salonspa.entity';
import { CreateSalonSpaConsultationDto } from './dto/create-salonspa.dto'

@Injectable()
export class SalonSpaConsultationService {
  constructor(
    @InjectRepository(SalonSpaConsultation)
    private consultationRepository: Repository<SalonSpaConsultation>,
  ) {}

  // ==================== CREATE ====================

  async create(createDto: CreateSalonSpaConsultationDto): Promise<SalonSpaConsultation> {
    try {
      // Check if appointment slot already booked
      const existingAppointment = await this.consultationRepository.findOne({
        where: {
          staffName: createDto.staffName,
          appointmentDate: createDto.appointmentDate,
          appointmentTime: createDto.appointmentTime,
        },
      });

      if (existingAppointment) {
        throw new BadRequestException(
          'This appointment slot is already booked. Please choose another time.'
        );
      }

      const consultation = this.consultationRepository.create(createDto);
      return await this.consultationRepository.save(consultation);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create consultation');
    }
  }

  // ==================== FIND ALL WITH FILTERS ====================

  async findAll(filters?: {
    startDate?: Date;
    endDate?: Date;
    staffName?: string;
    status?: string;
    serviceType?: string;
    paymentStatus?: string;
  }): Promise<SalonSpaConsultation[]> {
    const where: any = {};

    if (filters?.startDate && filters?.endDate) {
      where.appointmentDate = Between(filters.startDate, filters.endDate);
    } else if (filters?.startDate) {
      where.appointmentDate = filters.startDate;
    }

    if (filters?.staffName) {
      where.staffName = Like(`%${filters.staffName}%`);
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.serviceType) {
      where.serviceType = filters.serviceType;
    }

    if (filters?.paymentStatus) {
      where.paymentStatus = filters.paymentStatus;
    }

    return await this.consultationRepository.find({
      where,
      order: { appointmentDate: 'DESC', createdAt: 'DESC' },
    });
  }

  // ==================== FIND ONE ====================

  async findOne(id: number): Promise<SalonSpaConsultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation with ID ${id} not found`);
    }

    return consultation;
  }

  // ==================== TODAY'S APPOINTMENTS ====================

  async getTodayConsultations(): Promise<SalonSpaConsultation[]> {
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

  // ==================== UPCOMING APPOINTMENTS ====================

  async getUpcomingConsultations(): Promise<SalonSpaConsultation[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await this.consultationRepository.find({
      where: {
        appointmentDate: Between(
          today,
          new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
        ),
        status: 'Scheduled',
      },
      order: { appointmentDate: 'ASC', appointmentTime: 'ASC' },
      take: 20,
    });
  }

  // ==================== FIND BY PHONE ====================

  async findByPhone(phoneNumber: string): Promise<SalonSpaConsultation[]> {
    return await this.consultationRepository.find({
      where: { phoneNumber },
      order: { createdAt: 'DESC' },
    });
  }

  // ==================== FIND BY SERVICE TYPE ====================

  async findByServiceType(serviceType: string): Promise<SalonSpaConsultation[]> {
    return await this.consultationRepository.find({
      where: { serviceType },
      order: { appointmentDate: 'DESC' },
    });
  }

  // ==================== UPDATE STATUS ====================

  async updateStatus(id: number, status: string): Promise<SalonSpaConsultation> {
    const consultation = await this.findOne(id);
    consultation.status = status;
    return await this.consultationRepository.save(consultation);
  }

  // ==================== UPDATE PAYMENT ====================

  async updatePayment(
    id: number,
    paymentStatus: string,
    paymentMethod?: string,
    totalAmount?: number,
  ): Promise<SalonSpaConsultation> {
    const consultation = await this.findOne(id);
    consultation.paymentStatus = paymentStatus;
    if (paymentMethod) consultation.paymentMethod = paymentMethod;
    if (totalAmount) consultation.totalAmount = totalAmount;
    return await this.consultationRepository.save(consultation);
  }

  // ==================== DELETE ====================

  async remove(id: number): Promise<{ message: string }> {
    const consultation = await this.findOne(id);
    await this.consultationRepository.remove(consultation);
    return { message: `Consultation #${id} successfully deleted` };
  }
}