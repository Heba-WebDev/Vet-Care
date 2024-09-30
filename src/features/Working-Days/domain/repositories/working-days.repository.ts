import { UpdateWorkingDayDto } from '../dtos';
import { WorkingDayEntity } from '../entities';

export abstract class WorkingDaysRepository {
  abstract update(dto: UpdateWorkingDayDto): Promise<WorkingDayEntity | null>;
  abstract get(): Promise<WorkingDayEntity[]>;
}
