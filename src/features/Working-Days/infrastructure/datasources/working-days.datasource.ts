import { PrismaClient } from '@prisma/client';
import { UpdateWorkingDayDto, WorkingDayEntity, WorkingDaysDatasource } from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { WorkingDayMapper } from '../mappers';

export class WorkingDaysDatasourceImpl implements WorkingDaysDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async update(dto: UpdateWorkingDayDto): Promise<WorkingDayEntity | null> {
    const { id, active } = dto;
    try {
      const workingDay = await this._prisma.$transaction(async (prisma) => {
        const exists = await prisma.workingDays.findFirst({ where: { id } });
        if (!exists) throw CustomError.badRequest('No working day found');
        return prisma.workingDays.update({
          where: {
            id,
          },
          data: {
            active,
          },
        });
      });
      return WorkingDayMapper.workingDayEntityFromObject(workingDay);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async get(): Promise<WorkingDayEntity[]> {
    try {
      const workingDays = await this._prisma.workingDays.findMany({
        where: {
          active: true,
        },
      });
      return workingDays;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
