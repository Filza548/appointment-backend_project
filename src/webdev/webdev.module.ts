import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebDevelopmentProject } from './webdev.entity';
import { WebDevProjectService } from './webdev.service';
import { WebDevProjectController } from './webdev.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WebDevelopmentProject])],
  controllers: [WebDevProjectController],
  providers: [WebDevProjectService],
  exports: [WebDevProjectService],
})
export class WebDevProjectModule {}