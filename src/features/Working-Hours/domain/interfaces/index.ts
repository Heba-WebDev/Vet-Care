import { AddWorkingHoursDto, GetWorkingHoursDto } from '../dtos';
import { WorkingHoursEntity } from '../entities';

// types
export type WorkingHoursStandardRespons = {
  status: string;
  message: string | null;
  data: WorkingHoursEntity | WorkingHoursEntity[] | null;
};

// interfaces
export interface AddWorkingHoursUseCase {
  execute(dto: AddWorkingHoursDto): Promise<WorkingHoursStandardRespons>;
}

export interface GetWorkingHoursUseCase {
  execute(dto: GetWorkingHoursDto): Promise<WorkingHoursStandardRespons>;
}
