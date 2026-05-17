import { PartialType } from '@nestjs/mapped-types';
import { CreateMakeupBridalDto } from './create-makeup.dto';

export class UpdateMakeupBridalDto extends PartialType(CreateMakeupBridalDto) {}