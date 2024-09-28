import { PrismaClient } from '@prisma/client';
import {
  ActivateServiceDto,
  AddServiceDto,
  DeactivateServiceDto,
  GetAllServicesDto,
  ServiceEntity,
  ServicesDatasource,
  UpdateServiceDto,
} from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { ServiceMapper } from '../mapper';
import { AllServicesType } from '../../domain/interfaces';

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

  async update(serviceDto: UpdateServiceDto): Promise<ServiceEntity | null> {
    const { id, type, price } = serviceDto;
    try {
      const service = await this._prisma.$transaction(async (prisma) => {
        const serviceExists = await prisma.services.findFirst({ where: { id } });
        if (!serviceExists) throw CustomError.badRequest('No serivce found');
        return prisma.services.update({
          where: {
            id,
          },
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

  async getAll(serviceDto: GetAllServicesDto): Promise<AllServicesType> {
    const { active, page, limit } = serviceDto;
    const offset = (page - 1) * limit;
    try {
      const where = active !== null ? { active } : undefined;
      const [services, totalCount] = await this._prisma.$transaction([
        this._prisma.services.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { type: 'asc' },
        }),
        this._prisma.services.count({ where }),
      ]);
      const totalPages = Math.ceil(totalCount / limit);
      return {
        services,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
