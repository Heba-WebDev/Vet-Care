import {
  AddServiceDto,
  ActivateServiceDto,
  DeactivateServiceDto,
  UpdateServiceDto,
} from '../../domain';
import { addServiceSchema, activateServiceSchema, updateServiceSchema } from './joi-schemas';

export class ServicesInputValidation {
  add(serviceDto: AddServiceDto): string | null {
    const { error } = addServiceSchema.validate(serviceDto);
    if (error) return error.message;
    return null;
  }

  activate(serviceDto: ActivateServiceDto): string | null {
    const { error } = activateServiceSchema.validate(serviceDto);
    if (error) return error.message;
    return null;
  }

  dectivate(serviceDto: DeactivateServiceDto): string | null {
    const { error } = activateServiceSchema.validate(serviceDto);
    if (error) return error.message;
    return null;
  }

  update(serviceDto: UpdateServiceDto): string | null {
    const { error } = updateServiceSchema.validate(serviceDto);
    if (error) return error.message;
    return null;
  }
}
