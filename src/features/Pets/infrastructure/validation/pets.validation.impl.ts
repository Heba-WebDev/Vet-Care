import { RegisterPetDto, GetAllPetsDto } from '../../domain';
import { petGetAllSchema, petRegisterSchema } from './joi-schemas';

export class PetsInputValidation {
  register(petDto: RegisterPetDto): string | null {
    const { error } = petRegisterSchema.validate(petDto);
    if (error) return error.message;
    return null;
  }

  getAll(petDto: GetAllPetsDto): string | null {
    const { error } = petGetAllSchema.validate(petDto);
    if (error) return error.message;
    return null;
  }
}
