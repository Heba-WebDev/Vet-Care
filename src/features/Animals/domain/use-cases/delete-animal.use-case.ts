import { DeleteAnimalDto } from '../dtos';
import { AnimalsStandardResponse, DeleteAnimalUseCase } from '../interfaces';
import { AnimalsRepository } from '../repositories';

export class DeleteAnimal implements DeleteAnimalUseCase {
  constructor(private readonly repo: AnimalsRepository) {}
  async execute(animalDto: DeleteAnimalDto): Promise<AnimalsStandardResponse> {
    const animal = await this.repo.delete(animalDto);
    return {
      status: 'success',
      message: 'Animal successfully deleted',
      data: animal,
    };
  }
}
