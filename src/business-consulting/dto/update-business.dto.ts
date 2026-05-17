// dto/update-business-consultation.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessConsultationDto } from './create-business.dto';

export class UpdateBusinessConsultationDto extends PartialType(
  CreateBusinessConsultationDto,
) {}