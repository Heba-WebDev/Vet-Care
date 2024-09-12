import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import {
  PetsDatasource,
  PetEntity,
  RegisterPetDto,
  GetAllPetsDto,
  UpdatePetDto,
} from '../../domain';
import { PetMapper } from '../mapper';

export class PetsDatasourceImpl implements PetsDatasource {
  private readonly _prisma: PrismaClient;
  constructor(orm: PrismaClient = prisma) {
    this._prisma = orm;
  }

  async register(dto: RegisterPetDto): Promise<PetEntity | null> {
    const { owner_id, name, gender, animal_id } = dto;
    try {
      const pet = await this._prisma.$transaction(async (prisma) => {
        const [owner, animal] = await Promise.all([
          prisma.owners.findFirst({ where: { id: owner_id } }),
          prisma.animals.findFirst({ where: { id: animal_id } }),
        ]);
        if (!owner) throw CustomError.badRequest('No owner found');
        if (!animal) throw CustomError.badRequest('This animal type is not supported');
        return prisma.pets.create({
          data: {
            owner_id,
            name,
            gender,
            animal_id,
          },
        });
      });
      return PetMapper.petEntityFromObject(pet);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async getAll(dto: GetAllPetsDto): Promise<PetEntity[] | null> {
    const { owner_id } = dto;
    try {
      const pets = await this._prisma.$transaction(async (prisma) => {
        const owner = await prisma.owners.findFirst({ where: { id: owner_id } });
        if (!owner) throw CustomError.badRequest('No owner found');
        return prisma.pets.findMany({ where: { owner_id } });
      });
      if (pets.length !== 0) return pets;
      return null;
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }

  async update(dto: UpdatePetDto): Promise<PetEntity | null> {
    const { pet_id, owner_id, name, gender, animal_id } = dto;
    try {
      const data: Prisma.PetsUpdateInput = {};
      if (name) data.name = name;
      if (gender) data.gender = gender;
      const pet = await this._prisma.$transaction(async (prisma) => {
        if (animal_id) {
          const animal = await prisma.animals.findFirst({ where: { id: animal_id } });
          if (!animal) throw CustomError.badRequest('Invalid animal id');
        }
        return prisma.pets.update({
          where: {
            id: pet_id,
            owner_id,
          },
          data,
        });
      });
      if (!pet) throw CustomError.badRequest('Invalid owner id or pet id');
      return PetMapper.petEntityFromObject(pet);
    } catch (error) {
      logger.error(error);
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
