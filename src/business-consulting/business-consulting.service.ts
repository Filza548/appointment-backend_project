// business-consultation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessConsultation } from './business-consulting.entity';
import { CreateBusinessConsultationDto } from './dto/create-business.dto';
import { UpdateBusinessConsultationDto } from './dto/update-business.dto';

@Injectable()
export class BusinessConsultationService {
  constructor(
    @InjectRepository(BusinessConsultation)
    private readonly businessRepository: Repository<BusinessConsultation>,
  ) {}

  // ✅ GET ALL
  async findAll(): Promise<BusinessConsultation[]> {
    return await this.businessRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ GET ONE BY ID
  async findOne(id: number): Promise<BusinessConsultation> {
    const consultation = await this.businessRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException(`Business Consultation #${id} nahi mila`);
    }

    return consultation;
  }

  // ✅ CREATE
  async create(
    dto: CreateBusinessConsultationDto,
  ): Promise<BusinessConsultation> {
    const newConsultation = this.businessRepository.create(dto);
    return await this.businessRepository.save(newConsultation);
  }

  // ✅ UPDATE
  async update(
    id: number,
    dto: UpdateBusinessConsultationDto,
  ): Promise<BusinessConsultation> {
    const consultation = await this.findOne(id);
    Object.assign(consultation, dto);
    return await this.businessRepository.save(consultation);
  }

  // ✅ DELETE
  async remove(id: number): Promise<{ message: string }> {
    const consultation = await this.findOne(id);
    await this.businessRepository.remove(consultation);
    return { message: `Business Consultation #${id} delete ho gaya` };
  }
}