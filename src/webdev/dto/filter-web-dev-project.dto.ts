import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus, ProjectType, TechStack } from './create-web-dev-project.dto';

export class FilterWebDevProjectDto {
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsEnum(ProjectType)
  @IsOptional()
  projectType?: ProjectType;

  @IsEnum(TechStack)
  @IsOptional()
  techStack?: TechStack;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}