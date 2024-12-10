import { WorkingHoursInputValidation } from '../../infrastructure/validation/working-hours.validation.impl';

export class AddWorkingHoursDto {
  private constructor(
    public vet_id: string,
    public day_id: number,
    public start_time: string,
    public end_time: string,
    public break_start_time: string,
    public break_end_time: string,
  ) {}

  static add(
    vet_id: string,
    object: { [key: string]: string | number },
  ): [string?, AddWorkingHoursDto?] {
    const { day_id, start_time, end_time, break_start_time, break_end_time } = object;
    const dto = new AddWorkingHoursDto(
      vet_id,
      day_id as number,
      start_time as string,
      end_time as string,
      break_start_time as string,
      break_end_time as string,
    );
    const error = new WorkingHoursInputValidation().add(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
