import { AddAnimalsDto } from '../dtos';
import { AddAnimalUseCase, AnimalsStandardResponse } from '../interfaces';
import { AnimalsRepository } from '../repositories';

export class AddAnimal implements AddAnimalUseCase {
  constructor(private readonly repo: AnimalsRepository) {}
  public async execute(animalDto: AddAnimalsDto): Promise<AnimalsStandardResponse> {
    const animal = await this.repo.add(animalDto);
    return {
      status: 'success',
      message: 'Animal successfully added',
      data: animal,
    };
  }
}
