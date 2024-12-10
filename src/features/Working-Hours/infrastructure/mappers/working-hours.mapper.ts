import { CustomError } from '../../../../domain';
import { WorkingHoursEntity } from '../../domain';

export class WorkinghoursMapper {
  static workingHoursEntityFromObject(workingHoursEntity: {
    id: string;
    vet_id: string;
    day_id: number;
    start_time: Date;
    end_time: Date;
    break_start_time: Date;
    break_end_time: Date;
  }) {
    const { id, vet_id, day_id, start_time, end_time, break_start_time, break_end_time } =
      workingHoursEntity;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!vet_id) throw CustomError.badRequest('Missing vet_id');
    if (!day_id) throw CustomError.badRequest('Missing day_id');
    if (!start_time) throw CustomError.badRequest('Missing start_time');
    if (!end_time) throw CustomError.badRequest('Missing end_time');
    if (!break_start_time) throw CustomError.badRequest('Missing break_start_time');
    if (!break_end_time) throw CustomError.badRequest('Missing break_end_time');

    return new WorkingHoursEntity(
      id,
      vet_id,
      day_id,
      start_time.toString(),
      end_time.toString(),
      break_start_time.toString(),
      break_end_time.toString(),
    );
  }
}
