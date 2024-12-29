import { AddWorkingHoursDto, GetWorkingHoursDto } from '../dtos';
import { WorkingHoursEntity } from '../entities';

export abstract class WorkingHoursRepository {
  abstract add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null>;
  abstract get(dto: GetWorkingHoursDto): Promise<WorkingHoursEntity[] | null>;
}
