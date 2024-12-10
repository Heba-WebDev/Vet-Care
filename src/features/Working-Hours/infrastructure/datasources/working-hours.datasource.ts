import { PrismaClient } from '@prisma/client';
import { AddWorkingHoursDto, WorkingHoursDatasource, WorkingHoursEntity } from '../../domain';
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
        const day_exists = prisma.workingDays.findFirst({
          where: {
            id: day_id,
          },
        });
        if (!day_exists) throw CustomError.badRequest('No day was found');
        const vet_exists = prisma.veterinarians.findFirst({
          where: {
            id: vet_id,
          },
        });
        if (!vet_exists) throw CustomError.badRequest('No veterinarian was found');
        return prisma.workingHours.create({
          data: {
            vet_id,
            day_id,
            start_time: start_time,
            end_time: end_time,
            break_start_time: break_start_time,
            break_end_time: break_end_time,
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
}
