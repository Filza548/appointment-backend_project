// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Consultation } from './dentalconsulting.entity';
// import { ConsultationService } from './dental-consulting.service';
// import { ConsultationController } from './dental-consulting.controller';
// import {SupabaseService} from "../supabase/supabase.service";
// import { AuthModule } from '../auth/auth.module';




// @Module({
//   imports: [TypeOrmModule.forFeature([Consultation])],
//   controllers: [ConsultationController],
//   providers: [ConsultationService],
//   exports: [ConsultationService],
// })
// export class DentalConsultingModule {}



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './dentalconsulting.entity';
import { ConsultationService } from './dental-consulting.service';
import { ConsultationController } from './dental-consulting.controller';
import { SupabaseService } from "../supabase/supabase.service";
import { AuthModule } from '../auth/auth.module';

@Module({
  // 1. AuthModule ko yahan import karein taake uski functionalities mil saken
  imports: [
    TypeOrmModule.forFeature([Consultation]),
    AuthModule 
  ],
  controllers: [ConsultationController],
  // 2. SupabaseService ko providers mein lazmi dalein 
  // taake Guard isay use kar sakay
  providers: [
    ConsultationService, 
    SupabaseService
  ],
  exports: [ConsultationService],
})
export class DentalConsultingModule {}
