import { RegisterPetDto } from '../dtos';
import { PetEntity } from '../entities';

export abstract class PetsRepository {
  abstract register(dto: RegisterPetDto): Promise<PetEntity | null>;
}
