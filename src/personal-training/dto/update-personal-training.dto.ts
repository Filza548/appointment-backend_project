import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreatePersonalTrainingDto, SessionStatus } from './create-personal-training.dto';

export class UpdatePersonalTrainingDto extends PartialType(CreatePersonalTrainingDto) {
  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;
}