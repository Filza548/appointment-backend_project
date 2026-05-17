// legal-consultation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalConsultation } from './legalconsultation.entity';
import { CreateLegalConsultationDto } from './dto/createlega.dto';
import { UpdateLegalConsultationDto } from './dto/update-legal-consultation.dto';

@Injectable()
export class LegalConsultationService {
  constructor(
    @InjectRepository(LegalConsultation)
    private readonly consultationRepository: Repository<LegalConsultation>,
  ) {}

  // ✅ GET ALL
  async findAll(): Promise<LegalConsultation[]> {
    return await this.consultationRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ GET ONE
  async findOne(id: number): Promise<LegalConsultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException(`Consultation #${id} nahi mila`);
    }

    return consultation;
  }

  // ✅ CREATE
  async create(dto: CreateLegalConsultationDto): Promise<LegalConsultation> {
    const newConsultation = this.consultationRepository.create(dto);
    return await this.consultationRepository.save(newConsultation);
  }

  // ✅ UPDATE
  async update(id: number, dto: UpdateLegalConsultationDto): Promise<LegalConsultation> {
    const consultation = await this.findOne(id); // pehle check karo exist karta hai ya nahi
    Object.assign(consultation, dto);
    return await this.consultationRepository.save(consultation);
  }

  // ✅ DELETE
  async remove(id: number): Promise<{ message: string }> {
    const consultation = await this.findOne(id); // pehle check karo exist karta hai ya nahi
    await this.consultationRepository.remove(consultation);
    return { message: `Consultation #${id} delete ho gaya` };
  }
}