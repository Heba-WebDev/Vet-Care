import { GetWorkingHoursDto, AddWorkingHoursDto, UpdateWorkingHoursDto } from '../../domain';
import {
  addWorkingHoursSchema,
  getWorkingHoursSchema,
  updateWorkingHoursSchema,
} from './joi-schemas';

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

  update(updateWorkinghoursDto: UpdateWorkingHoursDto): string | null {
    const { error } = updateWorkingHoursSchema.validate(updateWorkinghoursDto);
    if (error) return error.message;
    return null;
  }
}
