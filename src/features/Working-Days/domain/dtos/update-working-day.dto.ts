import { ParsedQs } from 'qs';
import { WorkingDaysInputValidation } from '../../infrastructure';

export class UpdateWorkingDayDto {
  private constructor(
    public id: number,
    public active: boolean,
  ) {}

  static update(object: ParsedQs): [string?, UpdateWorkingDayDto?] {
    const { id, active } = object;
    if (active !== 'true' && active !== 'false') return ['Active must be true or false', undefined];
    const dto = new UpdateWorkingDayDto(parseInt(id as string), active === 'true' ? true : false);
    const error = new WorkingDaysInputValidation().update(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
