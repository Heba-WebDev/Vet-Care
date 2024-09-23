import { UpdateWorkingDayDto } from '../dtos';
import { WorkingDayEntity } from '../entities';

// types
export type WorkingDaysStandardResponse = {
  status: string;
  message: string | null;
  data: WorkingDayEntity | null;
};

// interfaces
export interface UpdateWorkingDayUseCase {
  execute(dto: UpdateWorkingDayDto): Promise<WorkingDaysStandardResponse>;
}
