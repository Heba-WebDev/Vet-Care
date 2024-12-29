import { ParsedQs } from 'qs';
import { WorkingHoursInputValidation } from '../../infrastructure';

export class GetWorkingHoursDto {
  private constructor(
    public readonly vet_id: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}

  static getWorkingHours(vet_id: string, object: ParsedQs): [string?, GetWorkingHoursDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 15;
    const dto = new GetWorkingHoursDto(vet_id, page, limit);
    const error = new WorkingHoursInputValidation().get(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
