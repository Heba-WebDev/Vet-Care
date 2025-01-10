import { AddWorkingHoursDto, GetWorkingHoursDto, UpdateWorkingHoursDto } from '../dtos';
import { WorkingHoursEntity } from '../entities';

export abstract class WorkingHoursDatasource {
  abstract add(dto: AddWorkingHoursDto): Promise<WorkingHoursEntity | null>;
  abstract get(dto: GetWorkingHoursDto): Promise<WorkingHoursEntity[] | null>;
  abstract update(dto: UpdateWorkingHoursDto): Promise<WorkingHoursEntity | null>;
}
