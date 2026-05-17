import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YogaMeditation } from './Yogameditation.entity';
import { CreateYogaMeditationDto } from './dto/create-yoga-meditation.dto';
import { UpdateYogaMeditationDto } from './dto/update-yoga-meditation.dto';

@Injectable()
export class YogaMeditationService {
  constructor(
    @InjectRepository(YogaMeditation)
    private readonly yogaRepo: Repository<YogaMeditation>,
  ) {}

  async create(dto: CreateYogaMeditationDto): Promise<YogaMeditation> {
    const session = this.yogaRepo.create(dto);
    return await this.yogaRepo.save(session);
  }

  async findAll(): Promise<YogaMeditation[]> {
    return await this.yogaRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<YogaMeditation> {
    const session = await this.yogaRepo.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Yoga session with ID "${id}" not found`);
    }
    return session;
  }

  async update(id: string, dto: UpdateYogaMeditationDto): Promise<YogaMeditation> {
    const session = await this.findOne(id);
    Object.assign(session, dto);
    return await this.yogaRepo.save(session);
  }

  async remove(id: string): Promise<{ message: string }> {
    const session = await this.findOne(id);
    await this.yogaRepo.remove(session);
    return { message: `Yoga session "${id}" deleted successfully` };
  }

  async findByStatus(status: string): Promise<YogaMeditation[]> {
    return await this.yogaRepo.find({
      where: { status },
      order: { sessionDate: 'ASC' },
    });
  }

  async findByServiceType(serviceType: string): Promise<YogaMeditation[]> {
    return await this.yogaRepo.find({
      where: { serviceType },
      order: { sessionDate: 'ASC' },
    });
  }
}