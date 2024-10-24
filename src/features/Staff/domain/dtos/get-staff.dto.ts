import { ParsedQs } from 'qs';
import { StaffInputValidation } from '../../infrastructure/validation';

export class GetAllStaffDto {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
  ) {}

  static get(object: ParsedQs): [string?, GetAllStaffDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 15;
    const staffDto = new GetAllStaffDto(page, limit);
    const err = new StaffInputValidation().getAll(staffDto);
    if (err) return [err, undefined];
    return [undefined, staffDto];
  }
}
