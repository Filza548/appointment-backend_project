import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeupBridalController } from './make-up.controller';
import { MakeupBridalService } from './make-up.service';
import { MakeupBridal } from './makeup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MakeupBridal])],
  controllers: [MakeupBridalController],
  providers: [MakeupBridalService],
  exports: [MakeupBridalService],
})
export class MakeUpModule {}
