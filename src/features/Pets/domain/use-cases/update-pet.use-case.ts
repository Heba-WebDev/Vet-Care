import { PetsRepository } from '../repositories';
import { PetsStandardResponse, UpdatePetUseCase } from '../interfaces';
import { UpdatePetDto } from '../dtos';
import { PetEntity } from '../entities';

export class UpdatePet implements UpdatePetUseCase {
  constructor(private readonly repo: PetsRepository) {}

  async execute(petDto: UpdatePetDto): Promise<PetsStandardResponse> {
    const pet = await this.repo.update(petDto);
    return {
      status: 'success',
      message: "Pet's info successfully updated",
      data: pet as PetEntity,
    };
  }
}
