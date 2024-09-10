import { RegisterPetDto } from '../dtos';
import { PetEntity } from '../entities';

export abstract class PetsDatasource {
  abstract register(dto: RegisterPetDto): Promise<PetEntity | null>;
}
