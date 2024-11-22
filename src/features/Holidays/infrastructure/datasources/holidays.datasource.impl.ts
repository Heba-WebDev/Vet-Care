import { PrismaClient } from '@prisma/client';
import {
  AddHolidayDto,
  GetHolidaysDto,
  GetPreviousHolidaysDto,
  HolidayEntity,
  HolidaysDatasource,
  UpdateHolidayDto,
} from '../../domain';
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
          date,
        },
      });
      return HolidayMapper.holidayEntityFromObject(holiday);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async get(holidaysDto: GetHolidaysDto): Promise<HolidayEntity[]> {
    const { page, limit } = holidaysDto;
    try {
      const offset = (page! - 1) * limit!;
      const now = new Date();
      const holidays = await this._prisma.publicHolidays.findMany({
        select: {
          id: true,
          name: true,
          date: true,
        },
        orderBy: {
          date: 'asc'
        },
        where: {
          date: {
            gte: now
          }
        },
        skip: offset,
        take: limit,
      });
      return holidays;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async getPrevious(holidaysDto: GetPreviousHolidaysDto): Promise<HolidayEntity[]> {
    const { page, limit } = holidaysDto;
    try {
      const offset = (page! - 1) * limit!;
      const now = new Date();
      const holidays = await this._prisma.publicHolidays.findMany({
        select: {
          id: true,
          name: true,
          date: true,
        },
        orderBy: {
          date: 'desc'
        },
        where: {
          date: {
            lt: now,
          },
        },
        skip: offset,
        take: limit,
      });
      return holidays;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async update(holidaysDto: UpdateHolidayDto): Promise<HolidayEntity | null> {
    const { id, name, date } = holidaysDto;
    try {
      const holiday = await this._prisma.publicHolidays.update({
        where: {
          id,
        },
        data: {
          name,
          date,
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
