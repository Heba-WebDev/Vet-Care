import { AddAnimalsDto, DeleteAnimalDto, UpdateAnimalDto } from '../dtos';
import { AnimalEntity } from '../entities';

// types
export type AnimalsStandardResponse = {
  status: string;
  message: string | null;
  data: AnimalEntity | null;
};

// interfaces
export interface AddAnimalUseCase {
  execute(animalDto: AddAnimalsDto): Promise<AnimalsStandardResponse>;
}

export interface DeleteAnimalUseCase {
  execute(animalDto: DeleteAnimalDto): Promise<AnimalsStandardResponse>;
}

export interface UpdateAnimalUseCase {
  execute(animalDto: UpdateAnimalDto): Promise<AnimalsStandardResponse>;
}
