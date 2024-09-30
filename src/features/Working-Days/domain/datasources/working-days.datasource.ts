import { UpdateWorkingDayDto } from '../dtos';
import { WorkingDayEntity } from '../entities';

export abstract class WorkingDaysDatasource {
  abstract update(dto: UpdateWorkingDayDto): Promise<WorkingDayEntity | null>;
  abstract get(): Promise<WorkingDayEntity[]>;
}
