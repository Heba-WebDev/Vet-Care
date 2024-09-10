import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../../data';
import { logger } from '../../../../infrastructure';
import { CustomError } from '../../../../domain';
import { PetsDatasource, PetEntity, RegisterPetDto } from '../../domain';
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
}
