import { RegisterPetDto, GetAllPetsDto, UpdatePetDto } from '../dtos';
import { PetEntity } from '../entities';

export abstract class PetsRepository {
  abstract register(dto: RegisterPetDto): Promise<PetEntity | null>;
  abstract getAll(dto: GetAllPetsDto): Promise<PetEntity[] | null>;
  abstract update(dto: UpdatePetDto): Promise<PetEntity | null>;
}
