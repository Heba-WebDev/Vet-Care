import { UpdateWorkingDayDto } from '../../domain';
import { updateWorkingDaySchema } from './joi-schemas';

export class WorkingDaysInputValidation {
  update(workingDayDto: UpdateWorkingDayDto): string | null {
    const { error } = updateWorkingDaySchema.validate(workingDayDto);
    if (error) return error.message;
    return null;
  }
}
