import { AddWorkingHoursDto } from '../dtos';
import { WorkingHoursEntity } from '../entities';

export abstract class WorkingHoursRepository {
  abstract add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null>;
}
