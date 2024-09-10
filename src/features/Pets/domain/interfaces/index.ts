import { RegisterPetDto } from '../dtos';
import { PetEntity } from '../entities/pet.entity';

// types
export type PetsStandardResponse = {
  status: string;
  message: string;
  data: PetEntity;
};

// interfaces
export interface RegisterPetUseCase {
  execute(petDto: RegisterPetDto): Promise<PetsStandardResponse>;
}
