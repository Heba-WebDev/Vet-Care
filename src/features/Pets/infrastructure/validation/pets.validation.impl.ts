import { RegisterPetDto, GetAllPetsDto, UpdatePetDto } from '../../domain';
import { petGetAllSchema, petRegisterSchema, petUpdateSchema } from './joi-schemas';

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

  update(petDto: UpdatePetDto): string | null {
    const { error } = petUpdateSchema.validate(petDto);
    if (error) return error.message;
    return null;
  }
}
