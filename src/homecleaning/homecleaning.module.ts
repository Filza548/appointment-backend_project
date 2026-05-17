import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeCleaning } from '../homecleaning/homecleaning.entity';
import { HomeCleaningService } from '../homecleaning/homecleaning.service';
import { HomeCleaningController } from '../homecleaning/homecleaning.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HomeCleaning])],
  controllers: [HomeCleaningController],
  providers: [HomeCleaningService],
  exports: [HomeCleaningService],
})
export class HomeCleaningModule {}