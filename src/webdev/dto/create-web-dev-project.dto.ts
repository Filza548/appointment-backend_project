import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum ProjectType {
  LANDING_PAGE = 'landing_page',
  ECOMMERCE = 'ecommerce',
  PORTFOLIO = 'portfolio',
  WEB_APP = 'web_app',
  CMS = 'cms',
  API_INTEGRATION = 'api_integration',
}

export enum TechStack {
  REACT = 'react',
  NEXTJS = 'nextjs',
  VUE = 'vue',
  ANGULAR = 'angular',
  HTML_CSS = 'html_css',
  NODEJS = 'nodejs',
  FULLSTACK = 'fullstack',
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateWebDevProjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  clientName: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(ProjectType)
  projectType: ProjectType;

  @IsEnum(TechStack)
  techStack: TechStack;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsUrl()
  @IsOptional()
  repositoryUrl?: string;

  @IsUrl()
  @IsOptional()
  liveUrl?: string;

  @IsBoolean()
  @IsOptional()
  isResponsive?: boolean;

  @IsBoolean()
  @IsOptional()
  seoOptimized?: boolean;

  @IsNumber()
  @IsOptional()
  projectBudget?: number;

  @IsString()
  @IsOptional()
  requirements?: string;
}