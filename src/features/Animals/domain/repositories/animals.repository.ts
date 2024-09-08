import { AddAnimalsDto, DeleteAnimalDto, UpdateAnimalDto } from '../dtos';
import { AnimalEntity } from '../entities';

export abstract class AnimalsRepository {
  abstract add(dto: AddAnimalsDto): Promise<AnimalEntity | null>;
  abstract delete(dto: DeleteAnimalDto): Promise<AnimalEntity | null>;
  abstract update(dto: UpdateAnimalDto): Promise<AnimalEntity | null>;
}
