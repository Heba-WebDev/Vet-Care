import { RegisterPetDto, GetAllPetsDto } from '../dtos';
import { PetEntity } from '../entities';

export abstract class PetsDatasource {
  abstract register(dto: RegisterPetDto): Promise<PetEntity | null>;
  abstract getAll(dto: GetAllPetsDto): Promise<PetEntity[] | null>;
}
