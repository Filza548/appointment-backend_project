import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateWebDevProjectDto, ProjectStatus } from './create-web-dev-project.dto';

export class UpdateWebDevProjectDto extends PartialType(CreateWebDevProjectDto) {
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}