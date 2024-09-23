import { CustomError } from '../../../../domain';
import { WorkingDayEntity } from '../../domain';

export class WorkingDayMapper {
  static workingDayEntityFromObject(workingDayEntity: WorkingDayEntity) {
    const { id, day, active } = workingDayEntity;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!day) throw CustomError.badRequest('Missing day');
    if (typeof active !== 'boolean') throw CustomError.badRequest('Missing active');

    return new WorkingDayEntity(id, day, active);
  }
}
