import { PrismaClient } from '@prisma/client';
import {
  ActivateServiceDto,
  AddServiceDto,
  DeactivateServiceDto,
  ServiceEntity,
  ServicesDatasource,
} from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { ServiceMapper } from '../mapper';

export class ServicesDatasourceImpl implements ServicesDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async add(serviceDto: AddServiceDto): Promise<ServiceEntity | null> {
    const { type, price } = serviceDto;
    try {
      const service = await this._prisma.$transaction(async (prisma) => {
        const exists = await prisma.services.findFirst({ where: { type } });
        if (exists) throw CustomError.badRequest('Service already exists');
        return prisma.services.create({
          data: {
            type,
            price,
          },
        });
      });
      return ServiceMapper.serviceEntityFromObject(service);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async activate(serviceDto: ActivateServiceDto): Promise<ServiceEntity | null> {
    const { id } = serviceDto;
    try {
      const service = await this._prisma.$transaction(async (prisma) => {
        const serviceExists = await prisma.services.findFirst({ where: { id } });
        if (!serviceExists) throw CustomError.badRequest('No serivce found');
        if (serviceExists.active) throw CustomError.badRequest('Service already activated');
        return prisma.services.update({
          where: {
            id,
          },
          data: {
            active: true,
          },
        });
      });
      return ServiceMapper.serviceEntityFromObject(service);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async deactivate(serviceDto: DeactivateServiceDto): Promise<ServiceEntity | null> {
    const { id } = serviceDto;
    try {
      const service = await this._prisma.$transaction(async (prisma) => {
        const serviceExists = await prisma.services.findFirst({ where: { id } });
        if (!serviceExists) throw CustomError.badRequest('No serivce found');
        if (!serviceExists.active) throw CustomError.badRequest('Service already deactivated');
        return prisma.services.update({
          where: {
            id,
          },
          data: {
            active: false,
          },
        });
      });
      return ServiceMapper.serviceEntityFromObject(service);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
