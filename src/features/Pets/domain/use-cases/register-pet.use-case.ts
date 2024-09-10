import { PetsRepository } from '../repositories';
import { PetsStandardResponse, RegisterPetUseCase } from '../interfaces';
import { RegisterPetDto } from '../dtos';
import { PetEntity } from '../entities';

export class RegisterPet implements RegisterPetUseCase {
  constructor(private readonly repo: PetsRepository) {}

  async execute(petDto: RegisterPetDto): Promise<PetsStandardResponse> {
    const pet = await this.repo.register(petDto);
    return {
      status: 'success',
      message: 'Pet successfully registered',
      data: pet as PetEntity,
    };
  }
}
