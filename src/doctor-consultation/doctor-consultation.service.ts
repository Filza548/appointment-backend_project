import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorConsultation } from './doctorconsultation.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';


@Injectable()
export class DoctorConsultationService {
    constructor(
        @InjectRepository(DoctorConsultation) private doctorConsultationRepository: Repository<DoctorConsultation>
    ) { }

    async create(doctorConsultationData:
        Partial<DoctorConsultation>): Promise<DoctorConsultation> {
        const doctorCon = this.doctorConsultationRepository.create(doctorConsultationData);
        return this.doctorConsultationRepository.save(doctorCon);
    }


    async findAll(): Promise<DoctorConsultation[]> {
        return this.doctorConsultationRepository.find();

    }

    async findOne(id: number):Promise<DoctorConsultation>{
        const getid = await this.doctorConsultationRepository.findOneBy({id})

        if (!getid){
            throw new NotFoundException(`Doctor Consultation with id ${id} not Found`)
        }

        return getid
    }


    }
