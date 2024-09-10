import { RegisterPetDto } from '../../domain';
import { petRegisterSchema } from './joi-schemas';

export class PetsInputValidation {
  register(ownerDto: RegisterPetDto): string | null {
    const { error } = petRegisterSchema.validate(ownerDto);
    if (error) return error.message;
    return null;
  }
}
