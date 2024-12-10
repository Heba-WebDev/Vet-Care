import { AddWorkingHoursDto } from '../../domain/dtos/add-working-hours.dto';
import { addWorkingHoursSchema } from './joi-schemas';

export class WorkingHoursInputValidation {
  add(addWorkingHoursDto: AddWorkingHoursDto): string | null {
    const { error } = addWorkingHoursSchema.validate(addWorkingHoursDto);
    if (error) return error.message;
    return null;
  }
}
