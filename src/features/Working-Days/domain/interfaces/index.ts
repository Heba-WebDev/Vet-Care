import { UpdateWorkingDayDto } from '../dtos';
import { WorkingDayEntity } from '../entities';

// types
export type WorkingDaysStandardResponse = {
  status: string;
  message: string | null;
  data: WorkingDayEntity | null;
};

export type AllWorkingDaysResponse = {
  status: string;
  message: string | null;
  data: WorkingDayEntity[];
};

// interfaces
export interface UpdateWorkingDayUseCase {
  execute(dto: UpdateWorkingDayDto): Promise<WorkingDaysStandardResponse>;
}

export interface GetWorkingDaysUseCase {
  execute(): Promise<AllWorkingDaysResponse>;
}
