import { UpdateAnimalDto } from '../dtos';
import { AnimalsStandardResponse, UpdateAnimalUseCase } from '../interfaces';
import { AnimalsRepository } from '../repositories';

export class UpdateAnimal implements UpdateAnimalUseCase {
  constructor(private readonly repo: AnimalsRepository) {}
  async execute(animalDto: UpdateAnimalDto): Promise<AnimalsStandardResponse> {
    const animal = await this.repo.update(animalDto);
    return {
      status: 'success',
      message: 'Animal successfully updated',
      data: animal,
    };
  }
}
