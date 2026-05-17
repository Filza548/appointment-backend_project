import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere } from 'typeorm';
import { PersonalTraining } from './personal-training.entity';
import { CreatePersonalTrainingDto, SessionStatus, PackageType } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { FilterPersonalTrainingDto } from './dto/filter-personal-training.dto';

// Sessions per package
const PACKAGE_SESSIONS: Record<PackageType, number> = {
  [PackageType.SINGLE]:     1,
  [PackageType.PACKAGE_5]:  5,
  [PackageType.PACKAGE_10]: 10,
  [PackageType.MONTHLY]:    20,
};

@Injectable()
export class PersonalTrainingService {
  constructor(
    @InjectRepository(PersonalTraining)
    private readonly trainingRepo: Repository<PersonalTraining>,
  ) {}

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(dto: CreatePersonalTrainingDto): Promise<PersonalTraining> {
    // Auto-calculate totalAmount if not provided
    const sessions = PACKAGE_SESSIONS[dto.packageType] ?? 1;
    const totalAmount = dto.totalAmount ?? dto.pricePerSession * sessions;

    // Validate session date is not in the past
    const sessionDate = new Date(dto.sessionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (sessionDate < today) {
      throw new BadRequestException('Session date cannot be in the past');
    }

    const session = this.trainingRepo.create({
      ...dto,
      totalAmount,
      status: SessionStatus.SCHEDULED,
    });

    return await this.trainingRepo.save(session);
  }

  // ─── Find All (filters + pagination) ─────────────────────────────────────

  async findAll(filterDto: FilterPersonalTrainingDto): Promise<{
    data: PersonalTraining[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      clientName, trainerName, status, sessionMode,
      packageType, fitnessGoal, startDate, endDate,
      page = 1, limit = 10,
    } = filterDto;

    const where: FindOptionsWhere<PersonalTraining> = {};

    if (clientName)  where.clientName  = Like(`%${clientName}%`);
    if (trainerName) where.trainerName = Like(`%${trainerName}%`);
    if (status)      where.status      = status;
    if (sessionMode) where.sessionMode = sessionMode;
    if (packageType) where.packageType = packageType;
    if (fitnessGoal) where.fitnessGoal = fitnessGoal;

    if (startDate && endDate) {
      where.sessionDate = Between(new Date(startDate), new Date(endDate)) as any;
    }

    const [data, total] = await this.trainingRepo.findAndCount({
      where,
      order: { sessionDate: 'ASC', sessionTime: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  // ─── Find One ─────────────────────────────────────────────────────────────

  async findOne(id: string): Promise<PersonalTraining> {
    const session = await this.trainingRepo.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Training session with ID "${id}" not found`);
    }
    return session;
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdatePersonalTrainingDto): Promise<PersonalTraining> {
    const session = await this.findOne(id);

    if (session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException('Cannot update a completed session');
    }
    if (session.status === SessionStatus.CANCELLED) {
      throw new BadRequestException('Cannot update a cancelled session');
    }

    // Recalculate total if price or package changes
    if (dto.pricePerSession || dto.packageType) {
      const price   = dto.pricePerSession ?? Number(session.pricePerSession);
      const pkg     = dto.packageType     ?? (session.packageType as PackageType);
      const sessions = PACKAGE_SESSIONS[pkg] ?? 1;
      dto.totalAmount = dto.totalAmount ?? price * sessions;
    }

    Object.assign(session, dto);
    return await this.trainingRepo.save(session);
  }

  // ─── Update Status ────────────────────────────────────────────────────────

  async updateStatus(id: string, status: SessionStatus): Promise<PersonalTraining> {
    const session = await this.findOne(id);

    const validTransitions: Record<SessionStatus, SessionStatus[]> = {
      [SessionStatus.SCHEDULED]:  [SessionStatus.CONFIRMED, SessionStatus.CANCELLED, SessionStatus.NO_SHOW],
      [SessionStatus.CONFIRMED]:  [SessionStatus.COMPLETED, SessionStatus.CANCELLED, SessionStatus.NO_SHOW],
      [SessionStatus.COMPLETED]:  [],
      [SessionStatus.CANCELLED]:  [],
      [SessionStatus.NO_SHOW]:    [SessionStatus.SCHEDULED],
    };

    if (!validTransitions[session.status].includes(status)) {
      throw new BadRequestException(
        `Cannot transition from "${session.status}" to "${status}"`,
      );
    }

    session.status = status;
    return await this.trainingRepo.save(session);
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  async remove(id: string): Promise<{ message: string }> {
    const session = await this.findOne(id);

    if (session.status === SessionStatus.CONFIRMED || session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException(
        `Cannot delete a session with status "${session.status}"`,
      );
    }

    await this.trainingRepo.remove(session);
    return { message: `Training session for "${session.clientName}" deleted successfully` };
  }

  // ─── Stats / Dashboard ────────────────────────────────────────────────────

  async getStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    bySessionMode: Record<string, number>;
    byFitnessGoal: Record<string, number>;
    byPackageType: Record<string, number>;
    totalRevenue: number;
    featuresUsage: { customWorkout: number; nutritionAdvice: number; progressTracking: number };
  }> {
    const all = await this.trainingRepo.find();

    const byStatus:      Record<string, number> = {};
    const bySessionMode: Record<string, number> = {};
    const byFitnessGoal: Record<string, number> = {};
    const byPackageType: Record<string, number> = {};
    let totalRevenue = 0;
    let customWorkout = 0, nutritionAdvice = 0, progressTracking = 0;

    for (const s of all) {
      byStatus[s.status]           = (byStatus[s.status] || 0) + 1;
      bySessionMode[s.sessionMode] = (bySessionMode[s.sessionMode] || 0) + 1;
      byFitnessGoal[s.fitnessGoal] = (byFitnessGoal[s.fitnessGoal] || 0) + 1;
      byPackageType[s.packageType] = (byPackageType[s.packageType] || 0) + 1;

      if (s.status === SessionStatus.COMPLETED && s.totalAmount) {
        totalRevenue += Number(s.totalAmount);
      }

      if (s.customWorkout)   customWorkout++;
      if (s.nutritionAdvice) nutritionAdvice++;
      if (s.progressTracking) progressTracking++;
    }

    return {
      total: all.length,
      byStatus,
      bySessionMode,
      byFitnessGoal,
      byPackageType,
      totalRevenue,
      featuresUsage: { customWorkout, nutritionAdvice, progressTracking },
    };
  }
}