import { AddWorkingHoursDto } from '../dtos';
import { WorkingHoursEntity } from '../entities';

// types
export type WorkingHoursStandardRespons = {
  status: string;
  message: string | null;
  data: WorkingHoursEntity | null;
};

// interfaces
export interface AddWorkingHoursUseCase {
  execute(dto: AddWorkingHoursDto): Promise<WorkingHoursStandardRespons>;
}
