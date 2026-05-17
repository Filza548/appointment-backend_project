import { Controller, Post ,Body, Get, Param} from '@nestjs/common';

import { DoctorConsultationService } from './doctor-consultation.service';
import { DoctorConsultation } from './doctorconsultation.entity';

@Controller('doctor-consultation')
export class DoctorConsultationController {
    constructor( private readonly doctorconsultation: DoctorConsultationService){}

    @Post()
    async createDoctor(@Body() body: Partial<DoctorConsultation>) : Promise<DoctorConsultation>{
        return this.doctorconsultation.create(body)
    }


    @Get()
    async getAllEmployees(): Promise<DoctorConsultation[]>{
        return this.doctorconsultation.findAll()
    }


    @Get(':id')
    async getIndividualdoctor(@Param('id') id:number):Promise<DoctorConsultation>{
        return this.doctorconsultation.findOne(id)
    }
}
