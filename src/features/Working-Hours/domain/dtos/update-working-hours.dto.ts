import { WorkingHoursInputValidation } from '../../infrastructure/validation/working-hours.validation.impl';

export class UpdateWorkingHoursDto {
  private constructor(
    public readonly vet_id: string,
    public readonly workday_id: string,
    public start_time: string,
    public end_time: string,
    public break_start_time: string,
    public break_end_time: string,
  ) {}

  static update(
    vet_id: string,
    workday_id: string,
    object: { [key: string]: string },
  ): [string?, UpdateWorkingHoursDto?] {
    const { start_time, end_time, break_start_time, break_end_time } = object;
    const dto = new UpdateWorkingHoursDto(
      vet_id,
      workday_id,
      start_time,
      end_time,
      break_start_time,
      break_end_time,
    );
    const error = new WorkingHoursInputValidation().update(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
