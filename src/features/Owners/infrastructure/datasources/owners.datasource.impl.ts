import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../../data';
import {
  AllOwnersDatasourceResponse,
  GetAllOwnersDto,
  OwnerEntity,
  OwnersDatasource,
  RegisterOwnerDto,
  UpdateOwnerDto,
} from '../../domain';
import { CustomError } from '../../../../domain';
import { OwnerMapper } from '../mapper';
import { logger } from '../../../../infrastructure';

export class OwnersDatasourceImpl implements OwnersDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null> {
    const { email, phone_number } = ownersDto;
    try {
      const emailExists = await this._prisma.owners.findFirst({ where: { email } });
      if (emailExists) throw CustomError.badRequest('Email already exists');
      const numberExists = await this._prisma.owners.findFirst({ where: { phone_number } });
      if (numberExists) throw CustomError.badRequest('Phone number already exists');
      const owner = await this._prisma.owners.create({
        data: {
          ...ownersDto,
        },
      });
      return OwnerMapper.ownerEntityFromObject(owner);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async getAll(ownerDto: GetAllOwnersDto): Promise<AllOwnersDatasourceResponse | null> {
    const { id, name, email, phone_number, page, limit } = ownerDto;
    try {
      const offset = (page! - 1) * limit!;
      const [totalOwners, owners] = await this._prisma.$transaction([
        this._prisma.owners.count({
          where: {
            id: id!,
            name: name!,
            email: email!,
            phone_number: phone_number!,
          },
        }),
        this._prisma.owners.findMany({
          where: {
            id: id!,
            name: name!,
            email: email!,
            phone_number: phone_number!,
          },
          skip: offset,
          take: limit,
        }),
      ]);

      const totalPages = Math.ceil(totalOwners / limit!);

      return {
        owners,
        currentPage: page!,
        totalPages,
      };
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async update(ownerDto: UpdateOwnerDto): Promise<OwnerEntity | null> {
    const { id, name, email, phone_number } = ownerDto;
    try {
      const owner = await this._prisma.owners.findFirst({ where: { id } });
      if (!owner) throw CustomError.notFound('No owner found');

      const conflictingOwner = await this._prisma.owners.findFirst({
        where: {
          OR: [
            { email: email || undefined }, // only if the email is defiend
            { phone_number: phone_number || undefined }, // only if the number is defiend
          ],
          NOT: { id },
        },
      });

      if (conflictingOwner) {
        if (conflictingOwner.email === email) {
          throw CustomError.badRequest('Email already exists');
        }
        if (conflictingOwner.phone_number === phone_number) {
          throw CustomError.badRequest('Phone number already exists');
        }
      }

      const data: { [key: string]: string } = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (phone_number) data.phone_number = phone_number;
      const updatedOwner = await this._prisma.owners.update({
        where: { id },
        data,
      });
      return OwnerMapper.ownerEntityFromObject(updatedOwner);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
