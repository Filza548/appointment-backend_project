import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlumbingService } from './plumbing-service.entity';
import { PlumbingServiceService } from './plumbingservices.service';
import { PlumbingServiceController } from './plumbingservices.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlumbingService])],
  controllers: [PlumbingServiceController],
  providers: [PlumbingServiceService],
  exports: [PlumbingServiceService],
})
export class PlumbingServiceModule {}