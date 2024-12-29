import { GetWorkingHoursDto, AddWorkingHoursDto } from '../../domain';
import { addWorkingHoursSchema, getWorkingHoursSchema } from './joi-schemas';

export class WorkingHoursInputValidation {
  add(addWorkingHoursDto: AddWorkingHoursDto): string | null {
    const { error } = addWorkingHoursSchema.validate(addWorkingHoursDto);
    if (error) return error.message;
    return null;
  }

  get(getWorkingHoursDto: GetWorkingHoursDto): string | null {
    const { error } = getWorkingHoursSchema.validate(getWorkingHoursDto);
    if (error) return error.message;
    return null;
  }
}
