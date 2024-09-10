import { PetsRepository } from '../repositories';
import { AllPetsStandardResponse, GetAllPetsUseCase } from '../interfaces';
import { GetAllPetsDto } from '../dtos';
import { PetEntity } from '../entities';

export class GetAllPet implements GetAllPetsUseCase {
  constructor(private readonly repo: PetsRepository) {}

  async execute(petDto: GetAllPetsDto): Promise<AllPetsStandardResponse> {
    const pet = await this.repo.getAll(petDto);
    return {
      status: 'success',
      message: 'Pet successfully registered',
      data: pet as PetEntity[],
    };
  }
}
