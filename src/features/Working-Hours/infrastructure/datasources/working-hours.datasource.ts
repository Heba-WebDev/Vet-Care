import { PrismaClient } from '@prisma/client';
import {
  AddWorkingHoursDto,
  GetWorkingHoursDto,
  WorkingHoursDatasource,
  WorkingHoursEntity,
} from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { WorkinghoursMapper } from '../mappers';

export class WorkingHoursDatasourceImpl implements WorkingHoursDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null> {
    const { vet_id, day_id, start_time, end_time, break_start_time, break_end_time } = dto;
    try {
      const workingHours = await this._prisma.$transaction(async (prisma) => {
        const day_exists = await prisma.workingDays.findFirst({
          where: {
            id: day_id,
            active: true,
          },
        });
        if (!day_exists) throw CustomError.badRequest('No day was found');
        const vet_exists = await prisma.veterinarians.findFirst({
          where: {
            id: vet_id,
          },
        });
        if (!vet_exists) throw CustomError.badRequest('No veterinarian was found');
        const vet_working_hours_exists = await prisma.workingHours.findFirst({
          where: {
            vet_id,
            day_id,
          },
        });
        if (vet_working_hours_exists)
          throw CustomError.badRequest('Working hours for this day already exists');

        this.validateTimes(start_time, end_time, break_start_time, break_end_time);
        return await prisma.workingHours.create({
          data: {
            vet_id,
            day_id,
            start_time: this.convertStringToDate(start_time),
            end_time: this.convertStringToDate(end_time),
            break_start_time: this.convertStringToDate(break_start_time),
            break_end_time: this.convertStringToDate(break_end_time),
          },
        });
      });
      return WorkinghoursMapper.workingHoursEntityFromObject(workingHours);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async get(dto: GetWorkingHoursDto): Promise<WorkingHoursEntity[] | null> {
    const { vet_id, page, limit } = dto;
    const offset = (page! - 1) * limit!;
    try {
      const workingHours = await this._prisma.$transaction(async (prisma) => {
        const vet_exists = await prisma.veterinarians.findFirst({
          where: {
            id: vet_id,
          },
        });
        if (!vet_exists) throw CustomError.badRequest('No veterinarian was found');
        const hours = await prisma.workingHours.findMany({
          where: {
            vet_id,
          },
          skip: offset,
          take: limit,
        });
        return hours;
      });
      return workingHours.map((hour) => WorkinghoursMapper.workingHoursEntityFromObject(hour));
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  private convertStringToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }
  private validateTimes(
    start_time: string,
    end_time: string,
    break_start_time: string,
    break_end_time: string,
  ): void {
    if (this.convertStringToDate(start_time) === this.convertStringToDate(end_time)) {
      throw CustomError.badRequest('Start time and end time cannot be equal');
    }
    if (
      this.convertStringToDate(break_start_time) < this.convertStringToDate(start_time) ||
      this.convertStringToDate(break_end_time) > this.convertStringToDate(end_time)
    ) {
      throw CustomError.badRequest('Break times must fall between the start time and end time');
    }
    if (this.convertStringToDate(break_end_time) <= this.convertStringToDate(break_start_time)) {
      throw CustomError.badRequest('Break start time must be before break end time');
    }
  }
}
