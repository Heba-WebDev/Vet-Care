import { AddAnimalsDto } from '../dtos';
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
