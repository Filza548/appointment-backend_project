import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { EmployeeModule } from './employee/employee.module';
import { DoctorConsultationModule } from './doctor-consultation/doctor-consultation.module';
import { DentalConsultingModule } from './dental-consulting/dental-consulting.module';
import { SalonspaModule } from './salonspa/salonspa.module';
import { MakeUpModule } from './make-up/make-up.module';
import { LegalconsultationModule } from './legalconsultation/legalconsultation.module';
import { BusinessConsultationModule } from './business-consulting/business-consulting.module';
import { SupabaseAuthGuard } from './auth/supabase-auth/supabase-auth.guard';
import { SupabaseService } from './supabase/supabase.service';
import { AuthModule } from './auth/auth.module';
import { WebDevProjectModule } from './webdev/webdev.module';
import { PersonalTrainingModule } from './personal-training/personal-training.module';
import { YogameditationModule } from './yogameditation/yogameditation.module';
import { HomeCleaningModule } from './homecleaning/homecleaning.module';
import { PlumbingServiceModule } from './plumbingservices/plumbingservices.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    // EmployeeModule,
    DoctorConsultationModule,
    DentalConsultingModule,
    SalonspaModule,
    MakeUpModule,
    LegalconsultationModule,
    BusinessConsultationModule,
    AuthModule,
    WebDevProjectModule,
    PersonalTrainingModule,
    YogameditationModule,
    HomeCleaningModule,
    PlumbingServiceModule,
  
  ],
  controllers: [AppController,],
  providers: [AppService, SupabaseAuthGuard, SupabaseService,],
})
export class AppModule {}
