import { AddAnimalsDto } from '../dtos';
import { AnimalEntity } from '../entities';

export abstract class AnimalsRepository {
  abstract add(dto: AddAnimalsDto): Promise<AnimalEntity | null>;
}
