import { PrismaClient } from '@prisma/client';
import { AddHolidayDto, HolidayEntity, HolidaysDatasource } from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { HolidayMapper } from '../mapper';

export class HolidaysDatasourceImpl implements HolidaysDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null> {
    const { name, date } = holidaysDto;
    try {
      const holiday = await this._prisma.publicHolidays.create({
        data: {
          name,
          date: date,
        },
      });
      return HolidayMapper.holidayEntityFromObject(holiday);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
