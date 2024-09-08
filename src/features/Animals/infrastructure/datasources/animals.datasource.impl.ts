import { PrismaClient, Animal } from '@prisma/client';
import {
  AddAnimalsDto,
  AnimalEntity,
  AnimalsDatasource,
  DeleteAnimalDto,
  UpdateAnimalDto,
} from '../../domain';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { AnimalMapper } from '../mapper';

export class AnimalsDatasourceImpl implements AnimalsDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async add(dto: AddAnimalsDto): Promise<AnimalEntity | null> {
    const { type, isSupported } = dto;
    try {
      if (!Object.values(Animal).includes(type as Animal))
        throw CustomError.badRequest("Animal type doesn't exist");
      const animalExists = await this._prisma.animals.findFirst({
        where: { type: type as Animal },
      });
      if (animalExists) throw CustomError.badRequest('Animal type already exists');
      const animal = await this._prisma.animals.create({
        data: {
          type: type as Animal,
          isSupported,
        },
      });

      return AnimalMapper.animalEntityFromObject(animal);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async delete(dto: DeleteAnimalDto): Promise<AnimalEntity | null> {
    const { id } = dto;
    try {
      const exists = await this._prisma.animals.findFirst({ where: { id } });
      if (!exists) throw CustomError.badRequest('No animal found');
      if (exists.isDeleted) throw CustomError.badRequest('Animal already deleted');
      const animal = await this._prisma.animals.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
      return AnimalMapper.animalEntityFromObject(animal);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async update(dto: UpdateAnimalDto): Promise<AnimalEntity | null> {
    const { id, isSupported, isDeleted } = dto;
    try {
      const exists = await this._prisma.animals.findFirst({ where: { id } });
      if (!exists) throw CustomError.badRequest('No animal found');
      const data: { [key: string]: boolean } = {};
      if (isSupported) data.isSupported = isSupported === 'true' ? true : false;
      if (isDeleted) data.isDeleted = isDeleted === 'true' ? true : false;
      const animal = await this._prisma.animals.update({
        where: { id },
        data: data,
      });
      return AnimalMapper.animalEntityFromObject(animal);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
