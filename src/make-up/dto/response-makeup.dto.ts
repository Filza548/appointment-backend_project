import { Expose, Exclude } from 'class-transformer';

export class ResponseMakeupBridalDto {

  @Expose()
  id: string;

  @Expose()
  customerName: string;

  @Expose()
  phone: string;

  @Expose()
  email?: string;

  @Expose()
  serviceType: string;

  @Expose()
  eventDate: Date;

  @Expose()
  eventTime?: string;

  @Expose()
  location?: string;

  @Expose()
  trialCompleted: boolean;

  @Expose()
  status: string;

  @Expose()
  totalAmount?: number;

  @Expose()
  notes?: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ResponseMakeupBridalDto>) {
    Object.assign(this, partial);
  }
}