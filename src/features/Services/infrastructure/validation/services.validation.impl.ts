import { AddServiceDto } from '../../domain';
import { addServiceSchema } from './joi-schemas';

export class ServicesInputValidation {
  add(serviceDto: AddServiceDto): string | null {
    const { error } = addServiceSchema.validate(serviceDto);
    if (error) return error.message;
    return null;
  }
}
